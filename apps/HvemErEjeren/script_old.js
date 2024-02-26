//Kig på treant.js til at tegne træ

function validateForm() {
    let cvr = document.forms["findOwners"]["cvr"].value;
    console.log("Hit, cvr: ", cvr);
    console.log(getInitialCompany(cvr));
}

function validateInput() {
    let cvr = document.getElementById('input-cvr').value;
    console.log(getInitialCompany(cvr));

    getInitialCompany(cvr).then(data => {
        console.log(data);
        let usableName = data.name.toLowerCase().replaceAll(' ', '-').replace('/', '');
        console.log("usableName: ", usableName);
        let initialCompanyData = getCompanyData(usableName, data.vat);
        console.log(initialCompanyData);
    });
}

async function getInitialCompany(cvr) {
    let res = await fetch(`https://cvrapi.dk/api?country=dk&vat=${cvr}`);
    let data = await res.json();
    return data;
}

function getCompanyData(companyName, cvr) {
    //https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
    //https://gomakethings.com/getting-html-with-fetch-in-vanilla-js/

    fetch(`https://cvrapi.dk/virksomhed/dk/${companyName}/${cvr}`).then(function (response) {
        return response.text();
    }).then(function (html) {
        console.log(html);
    });
}


function getDaughterCompaniesFromCustomer() {
    let companies = data.hits.hits.map((e) => {
        let vrVirksomhed = e["_source"].Vrvirksomhed;
        return getCompanyOwners(vrVirksomhed);
    });
    console.log("Companies: ", companies);
}

getDaughterCompaniesFromCustomer();

function getCompanyOwners(Vrvirksomhed) {
    let virksomheder = Vrvirksomhed.deltagerRelation.filter((d) => {
        return d.organisationer.some((o) => {
            return o.medlemsData.some((m) => {
                return m.attributter.some((a) => {
                    return a.type == "EJERANDEL_PROCENT" &&
                    a.vaerdier.some((v) => {
                        return v.periode.gyldigTil == null;
                    });
                });
            });
        });
    });
    return {
        cvr: Vrvirksomhed.cvrNummer,
        navn: Vrvirksomhed.virksomhedMetadata.nyesteNavn.navn,
        virksomheder: virksomheder,
        ejerandel: virksomheder[0].organisationer.find((o) => {
            return o.medlemsData.some((m) => {
                return m.attributter.some((a) => {
                    return a.type == "EJERANDEL_PROCENT";
                })
            })
        }).medlemsData[0].attributter.find(a => a.type == "EJERANDEL_PROCENT").vaerdier.find(v => !v.periode.gyldigTil).vaerdi
    };
}


console.log("Tietgen", getCompanyOwners(tietgenData.hits.hits[0]["_source"].Vrvirksomhed))