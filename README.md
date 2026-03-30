# 📉 Credit Chain Fragility Simulator

> **"Credit is just latency. Stability is an illusion."**

An interactive, agent-based economic simulation built to demonstrate the systemic risks of deferred settlement and liquidity contagion. This tool models a 4-tier supply chain (Consumer → Retailer → Wholesaler → Manufacturer) and visualizes how minor payment delays can cascade into total network collapse.

Built for **Hackonomics 2026**.

![Status](https://img.shields.io/badge/Status-Operational-violet?style=for-the-badge) ![Tech](https://img.shields.io/badge/Tech-React_D3_Recharts-blue?style=for-the-badge) ![Design](https://img.shields.io/badge/Design-Glassmorphism-black?style=for-the-badge)

---

## ✨ New in v3.0: Educational Overhaul

We've transformed the simulator from a visual demo into a structured learning tool for financial literacy and systemic risk analysis.

### 🎓 Guided Simulation Mode
Don't know where to start? Launch the **Guided Mode** to walk through 3+ curated lessons that explain the mechanics of credit freezes:
- **The Illusion of Solvency**: Watch how a single shock travels upstream.
- **The Cost of Late Protocols**: Analyze the compounding effect of universal "Net-30" delays.
- **Fragile Optimization**: See why "perfectly efficient" supply chains are the most dangerous.

### 🎛️ Scenario Presets (Sandbox)
Instantly jump into high-fidelity economic environments using our new **Scenario Cards**:
- **Late-pay Invoices**: High background delay rates.
- **Buy-now-pay-later Shock**: Rapid consumer demand spikes.
- **High Velocity**: Low margins, tight buffers, maximum risk.

### 📊 Real-time Timeline & Metrics
A complete telemetry overhaul for deep analysis:
- **Headline MetricsGrid**: Real-time tracking of `% Defaulted`, `Time-to-Collapse`, and `Buffer Strain`.
- **Systemic Failure Timeline**: An interactive area chart (powered by `recharts`) that graphs failed nodes against simulation ticks.

### 💡 Tooltips That Teach
Hover over any simulation slider in Sandbox mode to access **Educational Tooltips**. Each parameter includes:
1.  **A plain-English definition** (e.g., "What is a Liquidity Buffer?").
2.  **"Why it matters" insight**, explaining its specific role in preventing or causing a market freeze.

---

## 📉 The Theory

Modern economies rely on the assumption that future money is as good as present money.
- **Consumers** buy on credit.
- **Retailers** pay with Net-30/60 invoices.
- **Wholesalers** operate on tight commercial paper margins.

**The Simulator** visualizes the "Liquidity Void." When the bottom layer (Consumers) delays payment, the void travels up the chain faster than goods travel down. If liquidity buffers are breached, nodes fail, and the network stop paying each other—leading to **Systemic Contagion**.

---

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript 5, Vite 7
- **Logic**: Custom 5Hz Update Loop (Agent-Based)
- **Visualization**: D3.js (Force-Directed Graph) & Recharts (Timeline)
- **UI Architecture**: TailwindCSS 4, Framer Motion, Radix UI (Tooltips)
- **Icons**: Lucide React

---

## 🚀 Installation & Setup

1.  **Clone & Enter**:
    ```bash
    git clone https://github.com/your-username/credit-chain-fragility.git
    cd credit-chain-fragility
    ```
2.  **Install**:
    ```bash
    npm install
    ```
3.  **Run**:
    ```bash
    npm run dev
    ```
4.  **Explore**: Open `http://localhost:5173`.

---

## 🎮 Simulation Cockpit Guide

- **Green Nodes/Edges**: Healthy payment flows.
- **Yellow Nodes**: Stressed (Liquidity below 20% buffer).
- **Red Nodes/Edges**: Failed (Insolvent/Delayed).
- **Liquidity Shock**: Manually trigger a panic event to watch the domino effect.

---

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.
