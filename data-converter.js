/**
 * Helper script to convert BigQuery JSON results to Chart.js format
 *
 * Usage:
 * 1. Export your BigQuery results as JSON
 * 2. Paste the JSON array into the appropriate function below
 * 3. Copy the output and replace the corresponding data in index.html
 */
11
// Example BigQuery result format:
// [{"month": "2024-01-01", "human_resolved": 850, "ai_fully_resolved": 45, ...}, ...]

function convertAdoptionData(bigQueryResults) {
    const labels = bigQueryResults.map(row => {
        const date = new Date(row.month);
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    });

    const humanData = bigQueryResults.map(row => row.human_resolved / 1000); // Convert to thousands
    const aiFullyData = bigQueryResults.map(row => row.ai_fully_resolved / 1000);
    const aiHandoverData = bigQueryResults.map(row => row.ai_handover / 1000);
    const flowData = bigQueryResults.map(row => row.flow_resolved / 1000);

    return {
        labels,
        datasets: [
            {
                label: 'Human Resolved',
                data: humanData,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4
            },
            {
                label: 'AI Fully Resolved',
                data: aiFullyData,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                tension: 0.4
            },
            {
                label: 'AI Handover',
                data: aiHandoverData,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4
            },
            {
                label: 'Flow Resolved',
                data: flowData,
                borderColor: '#f39c12',
                backgroundColor: 'rgba(243, 156, 18, 0.1)',
                tension: 0.4
            }
        ]
    };
}

function convertCSATData(bigQueryResults) {
    // Group by quarter
    const quarters = [...new Set(bigQueryResults.map(row => row.quarter))].sort();
    const labels = quarters.map(q => {
        const date = new Date(q);
        return `Q${Math.floor(date.getMonth() / 3) + 1} ${date.getFullYear().toString().slice(2)}`;
    });

    // Extract data by resolution type
    const humanData = quarters.map(quarter => {
        const row = bigQueryResults.find(r => r.quarter === quarter && r.resolution_type === 'human');
        return row ? parseFloat(row.avg_csat).toFixed(1) : null;
    });

    const aiFullyData = quarters.map(quarter => {
        const row = bigQueryResults.find(r => r.quarter === quarter && r.resolution_type === 'ai_fully_resolved');
        return row ? parseFloat(row.avg_csat).toFixed(1) : null;
    });

    const aiOverallData = quarters.map(quarter => {
        const row = bigQueryResults.find(r => r.quarter === quarter && r.resolution_type === 'ai_overall');
        return row ? parseFloat(row.avg_csat).toFixed(1) : null;
    });

    const flowData = quarters.map(quarter => {
        const row = bigQueryResults.find(r => r.quarter === quarter && r.resolution_type === 'flow');
        return row ? parseFloat(row.avg_csat).toFixed(1) : null;
    });

    return {
        labels,
        datasets: [
            {
                label: 'Human',
                data: humanData,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4
            },
            {
                label: 'AI Fully Automated',
                data: aiFullyData,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                tension: 0.4
            },
            {
                label: 'AI Overall',
                data: aiOverallData,
                borderColor: '#9b59b6',
                backgroundColor: 'rgba(155, 89, 182, 0.1)',
                tension: 0.4
            },
            {
                label: 'Flow Handled',
                data: flowData,
                borderColor: '#f39c12',
                backgroundColor: 'rgba(243, 156, 18, 0.1)',
                tension: 0.4
            }
        ]
    };
}

function convertHandoverData(bigQueryResults) {
    const labels = bigQueryResults.map(row => {
        const date = new Date(row.month);
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    });

    const handoverData = bigQueryResults.map(row => parseFloat(row.handover_pct).toFixed(1));
    const fullyAutoData = bigQueryResults.map(row => parseFloat(row.fully_auto_pct).toFixed(1));

    return {
        labels,
        datasets: [
            {
                label: 'Handover Required',
                data: handoverData,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Fully Automated',
                data: fullyAutoData,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                tension: 0.4,
                fill: true
            }
        ]
    };
}

function convertRevenueData(bigQueryResults) {
    const labels = bigQueryResults.map(row => {
        const date = new Date(row.month);
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    });

    const revenueInfluencedData = bigQueryResults.map(row => parseFloat(row.revenue_influenced_m).toFixed(1));
    const totalGMVData = bigQueryResults.map(row => parseFloat(row.total_gmv_m).toFixed(1));

    return {
        labels,
        datasets: [
            {
                label: 'Revenue Influenced ($M)',
                data: revenueInfluencedData,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                tension: 0.4,
                yAxisID: 'y',
                fill: true
            },
            {
                label: 'Total GMV ($M)',
                data: totalGMVData,
                borderColor: '#95a5a6',
                backgroundColor: 'rgba(149, 165, 166, 0.1)',
                tension: 0.4,
                yAxisID: 'y1'
            }
        ]
    };
}

// Example usage:
// const rawData = [/* your BigQuery JSON results */];
// const chartData = convertAdoptionData(rawData);
// console.log(JSON.stringify(chartData, null, 2));

// Then copy the output and replace the corresponding data object in index.html

// Example with sample data:
const sampleAdoptionResults = [
    {"month": "2024-01-01", "human_resolved": 850000, "ai_fully_resolved": 45000, "ai_handover": 15000, "flow_resolved": 120000},
    {"month": "2024-02-01", "human_resolved": 840000, "ai_fully_resolved": 52000, "ai_handover": 18000, "flow_resolved": 125000}
];

console.log("Sample Adoption Data Conversion:");
console.log(JSON.stringify(convertAdoptionData(sampleAdoptionResults), null, 2));

module.exports = {
    convertAdoptionData,
    convertCSATData,
    convertHandoverData,
    convertRevenueData
};
