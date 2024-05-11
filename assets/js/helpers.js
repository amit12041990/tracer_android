function updateOrAddKeyword(newArray, obj) {
    try {
      const index = newArray.findIndex(item => item.keyword === obj.keyword);
      if (index !== -1) {
        // Keyword already exists, update sec, video_url, and timestamp
        newArray[index].sec = parseInt(obj.sec); // Convert sec to integer
        // Add unique video_urls
        obj.video_url.forEach(url => {
          if (!newArray[index].video_url.includes(url)) {
            newArray[index].video_url.push(url);
          }
        });
        // Add unique timestamps
        if (!newArray[index].timestamp.includes(obj.timestamp)) {
          newArray[index].timestamp.push(obj.timestamp);
        }
      } else {
        // Keyword does not exist, add it to the newArray
        newArray.push({
          keyword: obj.keyword,
          pages: obj.pages,
          sec: parseInt(obj.sec), // Convert sec to integer
          video: obj.video,
          video_url: obj.video_url,
          timestamp: [obj.timestamp]
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      throw error; // Rethrow the error
    }
  }
  
  export function mergeObjects(objects) {
    try {
      const newArray = [];
      objects.forEach((obj, index) => {
        try {
          updateOrAddKeyword(newArray, obj);
        } catch (error) {
          console.error(`Error processing object at index ${index}:`, error);
          console.log('Problematic object:', obj);
          // You can choose to continue processing other objects or throw the error here
          // throw error;
        }
      });
      return newArray;
    } catch (error) {
      console.error('An error occurred while merging objects:', error);
      throw error; // Rethrow the error
    }
  }
  
  