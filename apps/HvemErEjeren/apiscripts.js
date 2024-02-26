function getOwnersOfCompany(cvr) {
    fetch('http://distribution.virk.dk/cvr-permanent/virksomhed/_search', {
        method:'POST', 
        headers: {
            'Authorization': 'Basic ' + btoa(`${userid}:${password}`)
        },
        body: JSON.stringify({
            "query": {
                "term": {
                    "Vrvirksomhed.cvrNummer": `${cvr}`
                }
            }
        })
    }).then(response => response.json())
    .then(json => console.log(json));
}