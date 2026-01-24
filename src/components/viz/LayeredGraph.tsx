import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { Node, Edge, EntityType } from '../../core/types';

interface LayeredGraphProps {
    nodes: Node[];
    edges: Edge[];
    width: number;
    height: number;
}

const LAYER_ORDER: EntityType[] = ['CONSUMER', 'RETAILER', 'WHOLESALER', 'MANUFACTURER'];

export const LayeredGraph: React.FC<LayeredGraphProps> = ({ nodes, edges, width, height }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    // Group nodes by layer
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

    // Calculate positions
    const nodePositions = useMemo(() => {
        const positions = new Map<string, { x: number; y: number }>();
        const layerHeight = height / (LAYER_ORDER.length + 1);

        LAYER_ORDER.forEach((layer, layerIndex) => {
            const layerNodes = nodesByLayer[layer];
            const layerY = height - (layerIndex + 1) * layerHeight; // Consumers at bottom? Or Top?
            // Let's put Consumers at the Bottom (Layer 0) and Manufacturers at Top.
            // Or Follow the prompt: "Consumers (top)" -> "Manufacturers (bottom)".
            // Let's do Consumers Top to match the "Credit flowing up" or "Goods flowing down"?
            // Prompt said: "Edges point up the supply chain (who owes whom): Consumer -> Retailer".
            // Usually Supply Chain flows Down (M -> W -> R -> C). Money flows Up.
            // Let's place Consumers at BOTTOM and Manufacturers at TOP, so Money/Obligations flow UP.
            // Wait, standard charts often have "Roots" at top.
            // Let's try Consumers at Bottom (y = height - padding) and Manufacturers at Top (y = padding).

            const y = height - ((layerIndex + 0.5) * (height / LAYER_ORDER.length));

            layerNodes.forEach((node, nodeIndex) => {
                const x = (width / (layerNodes.length + 1)) * (nodeIndex + 1);
                positions.set(node.id, { x, y });
            });
        });
        return positions;
    }, [nodesByLayer, width, height]);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous

        // Draw Edges
        svg.append("g")
            .attr("class", "edges")
            .selectAll("line")
            .data(edges)
            .enter()
            .append("line")
            .attr("x1", d => nodePositions.get(d.source)?.x || 0)
            .attr("y1", d => nodePositions.get(d.source)?.y || 0)
            .attr("x2", d => nodePositions.get(d.target)?.x || 0)
            .attr("y2", d => nodePositions.get(d.target)?.y || 0)
            .attr("stroke", d => d.isDelayed ? "#ef4444" : "#94a3b8") // Red if delayed, Slate-400 if normal
            .attr("stroke-width", d => Math.max(1, Math.min(5, d.amount / 50))) // Thickness based on amount
            .attr("opacity", 0.6);

        // Draw Nodes
        const nodeGroup = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("g")
            .attr("transform", d => {
                const pos = nodePositions.get(d.id);
                return `translate(${pos?.x || 0}, ${pos?.y || 0})`;
            });

        nodeGroup.append("circle")
            .attr("r", d => d.type === 'MANUFACTURER' ? 12 : d.type === 'WHOLESALER' ? 10 : d.type === 'RETAILER' ? 8 : 5)
            .attr("fill", d => {
                if (d.status === 'FAILED') return "#ef4444"; // Red
                if (d.status === 'STRESSED') return "#eab308"; // Yellow
                // Healthy colors based on tier? or just Green?
                return "#22c55e"; // Green
            })
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 1.5)
            .append("title") // Tooltip
            .text(d => `${d.label}\nStatus: ${d.status}\nLiquidity: $${d.liquidity.toFixed(0)}`);

    }, [nodes, edges, nodePositions, width, height]);

    return (
        <svg ref={svgRef} width={width} height={height} className="overflow-visible" />
    );
};
