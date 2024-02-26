let vrVirksomhed = tietgenData.hits.hits[0]['_source'].Vrvirksomhed;

function getOwnersWhoAreCompanies(vrVirksomhed) {
    let allCompanies = vrVirksomhed.deltagerRelation.filter(d => d.deltager.enhedstype == "VIRKSOMHED");
    let companiesWhoAreOwners = getEntitiesWhoAreOwners(allCompanies);

    return companiesWhoAreOwners.map((c) => {
        return {
            cvr: c.deltager.forretningsnoegle,
            navn: c.deltager.navne.find(n => !n.periode.gyldigTil).navn,
            ejerandel: getEjerAndelForCompany(c)
        };
    });
}

function getOwnersWhoArePersons(vrVirksomhed) {
    let allPersons = vrVirksomhed.deltagerRelation.filter(d => d.deltager.enhedstype == "PERSON");
    let personsWhoAreOwners = getEntitiesWhoAreOwners(allPersons);

    return personsWhoAreOwners.map((c) => {
        return {
            cvr: c.deltager.forretningsnoegle,
            navn: c.deltager.navne.find(n => !n.periode.gyldigTil).navn,
            ejerandel: getEjerAndelForCompany(c)
        };
    });
}

function getEntitiesWhoAreOwners(entities) {
    return entities.filter(c => c.organisationer.some((o) => {
        return o.medlemsData.some((m) => {
            return m.attributter.some((a) => {
                return a.type == "EJERANDEL_PROCENT" && a.vaerdier.some(v => !v.periode.gyldigTil);
                });
            });
        })
    );
}

function getEjerAndelForCompany(company) {
    let organisationContainingOwnershipShare = company.organisationer.find((o) => {
        return o.medlemsData.some((m) => {
            return m.attributter.some((a) => {
                return a.type == "EJERANDEL_PROCENT" && a.vaerdier.some(v => !v.periode.gyldigTil);
                });
            });
        });
    
    let medlemsDataContainingOwnershipShare = organisationContainingOwnershipShare.medlemsData.find((m) => {
        return m.attributter.some((a) => {
            return a.type == "EJERANDEL_PROCENT" && a.vaerdier.some(v => !v.periode.gyldigTil);
            });
        });
    let actualOwnershipShare = medlemsDataContainingOwnershipShare.attributter.find(a => a.type == "EJERANDEL_PROCENT").vaerdier.find(v => !v.periode.gyldigTil).vaerdi;
    return actualOwnershipShare;
}

let ownerCompanies = getOwnersWhoAreCompanies(vrVirksomhed);
console.log("Virksomheder med ejerandel: ", ownerCompanies);

let ownerPersons = getOwnersWhoArePersons(vrVirksomhed);
console.log("Personer med ejerandel: ", ownerPersons);