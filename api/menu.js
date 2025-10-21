export default async function handler(req, res) {
    const { date } = req.query;
    
    const NEIS_CONFIG = {
        apiKey: 'b0c7d5fdb6be448397ae8014651f10c7',
        schoolCode: 'S090005598',
        officeCode: 'J100000001'
    };
    
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${NEIS_CONFIG.apiKey}&Type=json&ATPT_OFCDC_SC_CODE=${NEIS_CONFIG.officeCode}&SD_SCHUL_CODE=${NEIS_CONFIG.schoolCode}&MLSV_YMD=${date}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.mealServiceDietInfo && data.mealServiceDietInfo[1]) {
            const menuData = data.mealServiceDietInfo[1].row[0];
            const menu = menuData.DDISH_NM.replace(/<br\/>/g, '\n').trim();
            
            res.status(200).json({ menu });
        } else {
            res.status(404).json({ menu: null });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}