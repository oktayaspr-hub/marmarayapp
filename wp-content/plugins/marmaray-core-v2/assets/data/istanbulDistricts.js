export const ISTANBUL_DISTRICTS = [
    {
        id: 'kadikoy',
        name: 'Kadıköy',
        targetLocations: [
            { id: 'kadikoy_merkez', name: 'Kadıköy Merkez / Rıhtım', connections: ['M4', 'Vapur', 'Tramvay'] },
            { id: 'bostanci', name: 'Bostancı', connections: ['M8', 'Vapur'] }
        ]
    },
    {
        id: 'uskudar',
        name: 'Üsküdar',
        targetLocations: [
            { id: 'uskudar_merkez', name: 'Üsküdar Merkez', connections: ['M5', 'Vapur'] },
            { id: 'altunizade', name: 'Altunizade', connections: ['M5', 'Metrobus'] }
        ]
    },
    {
        id: 'sisli',
        name: 'Şişli',
        targetLocations: [
            { id: 'mecidiyekoy', name: 'Mecidiyeköy', connections: ['M2', 'M7', 'Metrobus'] },
            { id: 'zincirlikuyu', name: 'Zincirlikuyu', connections: ['Metrobus'] }
        ]
    },
    {
        id: 'besiktas',
        name: 'Beşiktaş',
        targetLocations: [
            { id: 'besiktas_merkez', name: 'Beşiktaş Merkez', connections: ['Vapur', 'Metrobus'] },
            { id: 'levent', name: 'Levent', connections: ['M2', 'M6'] }
        ]
    },
    {
        id: 'fatih',
        name: 'Fatih',
        targetLocations: [
            { id: 'sirkeci', name: 'Sirkeci', connections: ['T1', 'Vapur'] },
            { id: 'yenikapi', name: 'Yenikapı', connections: ['M1', 'M2'] }
        ]
    }
];
