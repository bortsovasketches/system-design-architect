'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
    securityLevel: 'loose',
    themeVariables: {
        fontFamily: 'Inter, system-ui, sans-serif',
        primaryColor: '#e0e7ff', // Indigo-100
        primaryTextColor: '#1e293b', // Slate-800
        primaryBorderColor: '#6366f1', // Indigo-500
        lineColor: '#94a3b8', // Slate-400
        secondaryColor: '#f8fafc', // Slate-50
        tertiaryColor: '#ffffff', // White
    }
});


interface ArchitectureDiagramProps {
    chart: string;
}

export default function ArchitectureDiagram({ chart }: ArchitectureDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current && chart) {
            containerRef.current.innerHTML = '';

            // Generate a unique ID for the chart to avoid conflicts
            const id = `mermaid-${Date.now()}`;

            mermaid.render(id, chart)
                .then(({ svg }) => {
                    if (containerRef.current) {
                        containerRef.current.innerHTML = svg;
                    }
                })
                .catch((error) => {
                    console.error('Mermaid rendering failed:', error);
                    if (containerRef.current) {
                        containerRef.current.innerHTML = `<div class="text-red-500 font-mono text-xs p-4 bg-red-50 border border-red-200 rounded">Error rendering diagram: ${error.message}</div>`;
                    }
                });
        }
    }, [chart]);

    return (
        <div className="w-full overflow-x-auto p-4 flex justify-center min-h-[300px] items-center">
            {/* 
                min-w-[600px] ensures that on small mobile screens, the chart 
                container maintains a minimum width, triggering the horizontal scroll 
                on the parent div.
             */}
            <div
                ref={containerRef}
                className="mermaid-canvas w-full min-w-[600px] md:min-w-0 flex justify-center"
            />
        </div>
    );
}
