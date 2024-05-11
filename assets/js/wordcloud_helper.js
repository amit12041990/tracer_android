export function calculateSum(data) {
    // Create an object to store unique timestamps and their corresponding objects
    const uniqueTimestamps = {};

    // Filter unique objects based on timestamp
    data.forEach(item => {
        if (!uniqueTimestamps[item.timestamp]) {
            uniqueTimestamps[item.timestamp] = item;
        }
    });

    // Initialize variables to store sum
    let secSum = 0;
    let pagesSum = 0;
    let videoSum = 0;
  

    // Calculate sum of seconds, pages, video numbers, 
    Object.values(uniqueTimestamps).forEach(item => {
        secSum += parseInt(item.count);
        pagesSum += parseInt(item.pages);
        videoSum += item.video;
        
    });

   

    return [secSum, pagesSum, videoSum];
}
