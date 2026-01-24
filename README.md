# Credit Chain Fragility Simulator

> **"Credit is just latency."**

An interactive economic simulation that models how deferred payments (credit) create systemic risk. This project demonstrates how a single payment delay in a supply chain can cascade upwards, transforming a liquidity crunch into a total network freeze.

Built for **Hackonomics 2026**.

![Banner Hint](https://img.shields.io/badge/Status-Operational-violet) ![Stack](https://img.shields.io/badge/Tech-React_D3_Tailwind-blue)

## 📉 The Theory

Modern economies rely on the assumption that future money is as good as present money.
- **Consumers** buy on credit.
- **Retailers** pay with Net-30 invoices.
- **Wholesalers** operate on commercial paper margins.

This simulator visualizes the **Credit Chain**:
1.  **Bottom Layer**: Consumers
2.  **Top Layer**: Manufacturers

When the bottom layer delays payment, the "liquidity void" travels up the chain faster than goods travel down. If liquidity buffers are breached, nodes fail, leading to systemic contagion.

## ✨ Features

-   **Agent-Based Simulation**: A 4-tier economy with autonomous nodes (Consumer -> Retailer -> Wholesaler -> Manufacturer).
-   **Real-time Network Visualization**: D3.js-powered force-directed graph with glowing neon aesthetics.
-   **"Glass Cockpit" UI**: Modern, floating interface for simulation controls and metrics.
-   **Interactive Mechanics**:
    -   **Liquidity Shock**: Manually trigger a "credit freeze" event to observe cascading failures.
    -   **Metrics**: Track the "Unsettled Payment Ratio" (UPR) in real-time.
-   **Scrollytelling Landing Page**: An immersive introduction to the economic theory behind the model.

## 🛠️ Tech Stack

-   **Core**: React 18, TypeScript, Vite
-   **Styling**: TailwindCSS v4, Framer Motion (Animations)
-   **Visualization**: D3.js
-   **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/credit-chain-fragility.git
    cd credit-chain-fragility
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open `http://localhost:5173` in your browser.

## 🎮 How to Use

1.  **Launch**: Start from the Landing Page and click "Initiate Simulation".
2.  **Observe**: Watch the green edges (active payments). Nodes pulse as they transact.
3.  **Stress Test**:
    -   Toggle **"Liquidity Shock"** in the sidebar.
    -   Watch as edges turn **RED** (Delayed).
    -   Observe nodes changing from Green (Healthy) -> Yellow (Stressed) -> Red (Failed).
4.  **Analyze**: Monitor the **Unsettled Payment Ratio** meter. A value > 60% usually indicates total geometric collapse.
5.  **Exit**: Use the `LogOut` icon in the sidebar to return to the theory section.

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/          # Glassmorphism controls & metrics
│   └── viz/         # D3.js LayeredGraph component
├── core/            # Simulation logic (Tick loop, Entity types)
├── hooks/           # useSimulation custom hook
├── pages/           # LandingPage and SimulationPage
└── index.css        # Tailwind/CSS variable definitions (Charcoal Theme)
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
