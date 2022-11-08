const baseUrl = "https://nodes-on-nodes-challenge.herokuapp.com/nodes/"


const getApiNodes = async (ids) => {
  const allIds = []
  for (const id of ids){
    const response = await fetch(baseUrl + id)
    const nodes = await response.json()
    if (nodes[0] &&  nodes[0].id) {
      allIds.push(nodes[0].id)
      if (nodes[0].child_node_ids && nodes[0].child_node_ids.length) {
       for (let i=0; i < nodes[0].child_node_ids.length; i++) {
         allIds.push(nodes[0].child_node_ids[i])
       }
      }
    }
  }
  
  const mostCommon = (arr) => {
    let mostFrequent = 1;
    let counter = 0;
    let id;

    for (let i=0; i < arr.length; i++) {
      for (let j=i; j<arr.length; j++) {
        if (arr[1] == arr[j]) counter++
        if (mostFrequent < counter) {
          mostFrequent = counter;
          id = arr[i];
        }
      }
      counter = 0
    }
    return id ? id : "no ID is most frequent"
  }
  mostCommon(allIds)
  const totalIds = [...new Set(allIds)];
  console.log("total number of unique IDs", totalIds.length)
  console.log("Most frequent ID", mostCommon(allIds))


}