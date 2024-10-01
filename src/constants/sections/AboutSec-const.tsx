import { FeatureStep } from "@/components/ui/FeatureCardWithTitle";
import { Code, Cpu, Globe, Layers, Zap, Lock } from "lucide-react";

export const featureSteps: FeatureStep[] = [
    {
        icon: Code,
        title: "Effortless Integration",
        description: "Seamlessly integrate our API into your existing infrastructure with just a few lines of code."
    },
    {
        icon: Zap,
        title: "Lightning-Fast Performance",
        description: "Experience unparalleled speed with our globally distributed network, ensuring minimal latency."
    },
    {
        icon: Layers,
        title: "Infinite Scalability",
        description: "Grow your application from hundreds to millions of users without changing a single line of code."
    },
    {
        icon: Globe,
        title: "Global Reach",
        description: "Leverage our worldwide infrastructure to deliver your service to users across the globe."
    },
    {
        icon: Cpu,
        title: "AI-Powered Insights",
        description: "Harness the power of machine learning to gain valuable insights and optimize your API usage."
    },
    {
        icon: Lock,
        title: "Enterprise-Grade Security",
        description: "Rest easy knowing your data is protected by state-of-the-art encryption and security measures."
    }
]
