import { PricingTier } from "@/components/ui/PricingCard";
import { Cloud, Shield, Zap } from "lucide-react";

export const pricingTiers: PricingTier[] = [
    {
        name: 'Starter',
        monthlyPrice: 9,
        yearlyPrice: 86,
        features: [
            '100,000 API calls/month',
            'Basic analytics',
            'Email support',
            '99.9% uptime SLA',
        ],
        cta: 'Start Free Trial',
        icon: Zap,
    },
    {
        name: 'Pro',
        monthlyPrice: 99,
        yearlyPrice: 990,
        features: [
            '1,000,000 API calls/month',
            'Advanced analytics',
            'Priority email support',
            '99.99% uptime SLA',
            'Custom integrations',
        ],
        cta: 'Go Pro',
        popular: true,
        icon: Shield,
    },
    {
        name: 'Enterprise',
        monthlyPrice: 299,
        yearlyPrice: 2990,
        features: [
            'Unlimited API calls',
            'Real-time analytics',
            '24/7 phone support',
            '99.999% uptime SLA',
            'Dedicated account manager',
            'Custom development',
        ],
        cta: 'Contact Sales',
        icon: Cloud,
    },
]
