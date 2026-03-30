import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import type { Node, Edge, EntityType } from '../../core/types';
import { cn } from '../../lib/utils';

interface LayeredGraphProps {
    nodes: Node[];
    edges: Edge[];
    width: number;
    height: number;
    className?: string;
}

const LAYER_ORDER: EntityType[] = ['CONSUMER', 'RETAILER', 'WHOLESALER', 'MANUFACTURER'];

export const LayeredGraph: React.FC<LayeredGraphProps> = ({ nodes, edges, width, height, className }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    const nodesByLayer = useMemo(() => {
        const grouped = {
            CONSUMER: [] as Node[],
            RETAILER: [] as Node[],
            WHOLESALER: [] as Node[],
            MANUFACTURER: [] as Node[],
        };
        nodes.forEach(n => grouped[n.type].push(n));
        return grouped;
    }, [nodes]);

    const nodePositions = useMemo(() => {
        const positions = new Map<string, { x: number; y: number }>();

        LAYER_ORDER.forEach((layer, layerIndex) => {
            const layerNodes = nodesByLayer[layer];
            // Padding based on count
            const _y = height - ((layerIndex + 0.5) * (height / LAYER_ORDER.length));

            layerNodes.forEach((node, nodeIndex) => {
                const x = (width / (layerNodes.length + 1)) * (nodeIndex + 1);
                positions.set(node.id, { x, y: _y });
            });
        });
        return positions;
    }, [nodesByLayer, width, height]);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // Define Glow Filter
        const defs = svg.append("defs");
        const filter = defs.append("filter")
            .attr("id", "glow")
            .attr("x", "-50%")
            .attr("y", "-50%")
            .attr("width", "200%")
            .attr("height", "200%");
        filter.append("feGaussianBlur")
            .attr("stdDeviation", "2.5")
            .attr("result", "coloredBlur");
        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        // Edges (bottom layer)
        svg.append("g")
            .attr("class", "edges")
            .selectAll("line")
            .data(edges)
            .enter()
            .append("line")
            .attr("x1", (d: Edge) => nodePositions.get(d.source)?.x || 0)
            .attr("y1", (d: Edge) => nodePositions.get(d.source)?.y || 0)
            .attr("x2", (d: Edge) => nodePositions.get(d.target)?.x || 0)
            .attr("y2", (d: Edge) => nodePositions.get(d.target)?.y || 0)
            .attr("stroke", (d: Edge) => d.isDelayed ? "#FF453A" : "#30D158") // iOS Red for freeze, iOS Green for flow
            .attr("stroke-width", (d: Edge) => d.isDelayed ? 2 : Math.max(0.5, Math.min(3, d.amount / 50)))
            .attr("opacity", (d: Edge) => d.isDelayed ? 0.7 : 0.3)
            .attr("filter", "url(#glow)")
            .style("mix-blend-mode", "screen");

        // Nodes (top layer)
        const nodeGroup = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("g")
            .attr("transform", (d: Node) => {
                const pos = nodePositions.get(d.id);
                return `translate(${pos?.x || 0}, ${pos?.y || 0})`;
            });

        nodeGroup.append("circle")
            .attr("r", (d: Node) => d.type === 'MANUFACTURER' ? 14 : d.type === 'WHOLESALER' ? 10 : d.type === 'RETAILER' ? 7 : 4)
            .attr("fill", (d: Node) => {
                if (d.status === 'FAILED') return "#FF453A"; // iOS Red
                if (d.status === 'STRESSED') return "#FFD60A"; // iOS Yellow
                return "#000000"; // Pure black core
            })
            .attr("stroke", (d: Node) => {
                if (d.status === 'FAILED') return "#FF453A";
                if (d.status === 'STRESSED') return "#FFD60A";
                return "#0A84FF"; // Apple Blue for healthy
            })
            .attr("stroke-width", (d: Node) => d.status === 'HEALTHY' ? 2 : 3)
            .attr("filter", "url(#glow)")
            .style("cursor", "crosshair")
            .append("title")
            .text((d: Node) => `${d.label}\nStatus: ${d.status}\nLiquidity: $${d.liquidity.toLocaleString()}`);

    }, [nodes, edges, nodePositions, width, height]);

    return (
        <svg ref={svgRef} width={width} height={height} className={cn("overflow-visible", className)} />
    );
};
