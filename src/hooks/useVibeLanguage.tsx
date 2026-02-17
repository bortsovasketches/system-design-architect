'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'tech' | 'vibe';

interface VibeLanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const DICTIONARY: Record<string, string> = {
    'Database': 'Memory Bank',
    'Auth': 'Bouncer',
    'API': 'Messenger',
    'Latency': 'Wait Time',
    'Frontend': 'Storefront',
    'Backend': 'Factory',
    'Microservice': 'Specialist',
    'Serverless': 'On-Demand',
    'CI/CD': 'Assembly Line',
    'Container': 'Lunchbox',
    'Load Balancer': 'Traffic Cop',
    'Cache': 'Short-Term Memory',
    'CDN': 'Fast Lane',
    'Encryption': 'Secret Code',
    'Gateway': 'Front Desk',
    'Throughput': 'Speed Limit',
    'Scalability': 'Growth Potential',
    'Reliability': 'Trust Score',
    'Maintenance': 'Checkups',
    'Deployment': 'Grand Opening',
    'Debugging': 'Exterminating',
    'Refactoring': 'Tidying Up',
    'Version Control': 'Time Machine',
    'Analytics': 'Scoreboard',
    'Realtime': 'Live Stream',
    'AI/ML': 'Brain Power',
    'Architecture': 'Master Plan',
    'System Design': 'Vibe Check',
};

const VibeLanguageContext = createContext<VibeLanguageContextType | undefined>(undefined);

export function VibeLanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('tech');

    const t = (key: string) => {
        if (language === 'tech') return key;
        return DICTIONARY[key] || key;
    };

    return (
        <VibeLanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </VibeLanguageContext.Provider>
    );
}

export function useVibeLanguage() {
    const context = useContext(VibeLanguageContext);
    if (undefined === context) {
        throw new Error('useVibeLanguage must be used within a VibeLanguageProvider');
    }
    return context;
}
