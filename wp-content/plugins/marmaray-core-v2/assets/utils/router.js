export async function calculateRoute(originId, destId, mode, targetId, t) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock logic
            if (originId === targetId) {
                resolve({ info: true });
                return;
            }
            
            const path = [];
            let totalDuration = 0;
            
            // Assume 20 min Marmaray ride
            path.push({
                instruction: 'Marmaray ile yolculuk',
                line: 'Marmaray',
                duration: 20
            });
            totalDuration += 20;
            
            if (targetId.includes('kadikoy')) {
                path.push({
                    instruction: 'Aktarma (Ayrılık Çeşmesi)',
                    line: 'Metro (M4)',
                    duration: 5
                });
                totalDuration += 5;
            } else if (targetId.includes('mecidiyekoy')) {
                path.push({
                    instruction: 'Aktarma (Yenikapı)',
                    line: 'Metro (M2)',
                    duration: 15
                });
                totalDuration += 15;
            } else {
                path.push({
                    instruction: 'Aktarma',
                    line: 'Yürüyüş',
                    duration: 10
                });
                totalDuration += 10;
            }
            
            resolve({
                path: path,
                totalDuration: totalDuration
            });
        }, 500);
    });
}
