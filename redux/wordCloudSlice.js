
import { createSlice } from '@reduxjs/toolkit';


const wordCloudSlice = createSlice({
    name: 'wordCloud',
    initialState: {
        // Define your initial state here
        data: [],
    },
    reducers: {
        setData: (state, action) => {
            
           const  alldata = action.payload
           
          
           const fetchData = alldata[0]['fetched_data']
          
          
           
           
          
         
           const grammarChartData=fetchData[1]
           const tonalityChartData=fetchData[2]
           const tonalityComments=allComments(fetchData)
           const screenTimeChartData = fetchData[4]

           const wordcloud=alldata[0]['fetched_data']
          

           const screensData = []
           screensData.push(
            {
                'grammarChart':grammarChartData,'tonaliChart':[tonalityChartData,tonalityComments],'screenChart':screenTimeChartData,

                'wordcloudChart':wordcloud


            }
           )

          
          state.data = screensData
           
            
            
        }
    }
});

// helper function
function allComments(data) {
    console.log(data)
    if (!data || !Array.isArray(data) || data.length < 6 || !Array.isArray(data[5])) {
        console.error("Invalid data format or missing data[5].");
        return null; // or return []
    }

    const uniqueData = new Map();

    data[5].forEach(item => {
        if (item.comment && item.timestamp) {
            item.comment.forEach(el => {
                const key = `${item.timestamp}_${el.comment}`;
                if (!uniqueData.has(key)) {
                    uniqueData.set(key, {
                        'comment': el.comment,
                        'emotion': el.emotion,
                        'tonality': el.tonality,
                        'url': el.url,
                        'timestamp': item.timestamp
                    });
                }
            });
        }
    });

    return Array.from(uniqueData.values());
}

function filterAndMergeData(data) {

    const comments = [];

    data.forEach(entry => {
        if (entry.comment) {
            entry.comment.forEach(commentObj => {
                const commentEntry = {
                    keyword: entry.keyword,
                    video_url: commentObj.url,
                    comment: commentObj.comment
                };
                comments.push(commentEntry);
            });
            // Remove the comment key from the original entry
            delete entry.comment;
        }
    });
    // Merge objects based on matching keyword
    const mergedData = {};
    data.forEach(entry => {
        const key = entry.keyword;
        if (!mergedData[key]) {
            mergedData[key] = { ...entry }; // Copy the entry object
        } else {
            // Merge pages and sec values
            mergedData[key].pages += entry.pages;
             mergedData[key].video += entry.video;
            mergedData[key].sec = parseInt(mergedData[key].sec) + parseInt(entry.sec);
        }
    });
    
    // Convert mergedData object back to array
    const mergedArray = Object.values(mergedData);
    const newData = mergedArray.map(entry => {
        // If sec is a string, convert it to an integer, otherwise leave it as it is
        const sec = typeof entry.sec === 'string' ? parseInt(entry.sec) : entry.sec;
        return { ...entry, sec }; // Return a new object with updated sec value
    });
   
    newData.forEach(dataItem => {
        // Iterate through the comment array
        comments.forEach(commentItem => {
            // Check if the keywords match and if data object doesn't have video_url
            if (dataItem.keyword === commentItem.keyword && !dataItem.video_url) {
                // Push the url to the data object
                dataItem.video_url = commentItem.video_url;

            }
        });
    });
    

    // Calculate percentile and add as a new property
    newData.forEach(obj => {
        obj.percent = calculatePercentile(newData, obj.sec);
    });
   
   
    const filteredData = newData.map(obj => Object.values(obj));  

    return filteredData
}

function calculatePercentile(arr, val) {
    let count = 0;
    arr.forEach(obj => {
        if (obj.sec <= val) {
            count++;
        }
    });
    return Math.floor(count / arr.length) * 100;
}
function mapAndModifyObjects(data) {
    return data.map(obj => {
      // Convert 'sec' to integer if it's in string form
      if (typeof obj.sec === 'string') {
        obj.sec = parseInt(obj.sec);
      }
      return obj;
    });
  }
export const { setData } = wordCloudSlice.actions;
// selectors.js
export const selectWordCloudData = state => state.wc.data;

export default wordCloudSlice.reducer;