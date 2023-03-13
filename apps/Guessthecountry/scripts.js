$(function(){
    getRandomCountry();
    autocomplete(document.getElementById('myInput'), mapdata.map(function(e){
        return e;
    }));
});

function getRandomCountry() { // min and max included 
    var rng = Math.floor(Math.random() * (mapdata.length - 0 + 1) + 0);
    goalCountry = mapdata[rng];
    document.getElementById('question-img').src = `countries/${goalCountry.alpha2.toLocaleLowerCase()}.svg`;
}

function calculateDist(country1, country2) {
  lat1 = country1.latitude;
  lat2 = country2.latitude;
  lon1 = country1.longitude;
  lon2 = country2.longitude;
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c; // in metres
  return Math.round(d/1000, 2);
}

function angleFromCoordinate(country1, country2) {
  // angle in radians
  // var angleRadians = Math.atan2(country2.longitude - country1.longitude, country2.latitude - country1.longitude);
  // angle in degrees
  var angleDeg = Math.atan2(country2.longitude - country1.longitude, country2.latitude - country1.latitude) * 180 / Math.PI;
  console.log("Angle from coordinate: ", angleDeg);
  return angleDeg;
}

const fnCountries = [ 
  {"id":4,"alpha2":"af","alpha3":"afg","name":"Afghanistan"},
  {"id":8,"alpha2":"al","alpha3":"alb","name":"Albania"},
  {"id":12,"alpha2":"dz","alpha3":"dza","name":"Algeria"},
  {"id":20,"alpha2":"ad","alpha3":"and","name":"Andorra"},
  {"id":24,"alpha2":"ao","alpha3":"ago","name":"Angola"},
  {"id":28,"alpha2":"ag","alpha3":"atg","name":"Antigua and Barbuda"},
  {"id":32,"alpha2":"ar","alpha3":"arg","name":"Argentina"},
  {"id":51,"alpha2":"am","alpha3":"arm","name":"Armenia"},
  {"id":36,"alpha2":"au","alpha3":"aus","name":"Australia"},
  {"id":40,"alpha2":"at","alpha3":"aut","name":"Austria"},
  {"id":31,"alpha2":"az","alpha3":"aze","name":"Azerbaijan"},
  {"id":44,"alpha2":"bs","alpha3":"bhs","name":"Bahamas"},
  {"id":48,"alpha2":"bh","alpha3":"bhr","name":"Bahrain"},
  {"id":50,"alpha2":"bd","alpha3":"bgd","name":"Bangladesh"},
  {"id":52,"alpha2":"bb","alpha3":"brb","name":"Barbados"},
  {"id":112,"alpha2":"by","alpha3":"blr","name":"Belarus"},
  {"id":56,"alpha2":"be","alpha3":"bel","name":"Belgium"},
  {"id":84,"alpha2":"bz","alpha3":"blz","name":"Belize"},
  {"id":204,"alpha2":"bj","alpha3":"ben","name":"Benin"},
  {"id":64,"alpha2":"bt","alpha3":"btn","name":"Bhutan"},
  {"id":68,"alpha2":"bo","alpha3":"bol","name":"Bolivia"},
  {"id":70,"alpha2":"ba","alpha3":"bih","name":"Bosnia and Herzegovina"},
  {"id":72,"alpha2":"bw","alpha3":"bwa","name":"Botswana"},
  {"id":76,"alpha2":"br","alpha3":"bra","name":"Brazil"},
  {"id":96,"alpha2":"bn","alpha3":"brn","name":"Brunei Darussalam"},
  {"id":100,"alpha2":"bg","alpha3":"bgr","name":"Bulgaria"},
  {"id":854,"alpha2":"bf","alpha3":"bfa","name":"Burkina Faso"},
  {"id":108,"alpha2":"bi","alpha3":"bdi","name":"Burundi"},
  {"id":132,"alpha2":"cv","alpha3":"cpv","name":"Cabo Verde"},
  {"id":116,"alpha2":"kh","alpha3":"khm","name":"Cambodia"},
  {"id":120,"alpha2":"cm","alpha3":"cmr","name":"Cameroon"},
  {"id":124,"alpha2":"ca","alpha3":"can","name":"Canada"},
  {"id":140,"alpha2":"cf","alpha3":"caf","name":"Central African Republic"},
  {"id":148,"alpha2":"td","alpha3":"tcd","name":"Chad"},
  {"id":152,"alpha2":"cl","alpha3":"chl","name":"Chile"},
  {"id":156,"alpha2":"cn","alpha3":"chn","name":"China"},
  {"id":170,"alpha2":"co","alpha3":"col","name":"Colombia"},
  {"id":174,"alpha2":"km","alpha3":"com","name":"Comoros"},
  {"id":178,"alpha2":"cg","alpha3":"cog","name":"Congo"},
  {"id":180,"alpha2":"cd","alpha3":"cod","name":"Democratic Republic of the Congo"},
  {"id":188,"alpha2":"cr","alpha3":"cri","name":"Costa Rica"},
  {"id":384,"alpha2":"ci","alpha3":"civ","name":"Côte d'Ivoire"},
  {"id":191,"alpha2":"hr","alpha3":"hrv","name":"Croatia"},
  {"id":192,"alpha2":"cu","alpha3":"cub","name":"Cuba"},
  {"id":196,"alpha2":"cy","alpha3":"cyp","name":"Cyprus"},
  {"id":203,"alpha2":"cz","alpha3":"cze","name":"Czechia"},
  {"id":208,"alpha2":"dk","alpha3":"dnk","name":"Denmark"},
  {"id":262,"alpha2":"dj","alpha3":"dji","name":"Djibouti"},
  {"id":212,"alpha2":"dm","alpha3":"dma","name":"Dominica"},
  {"id":214,"alpha2":"do","alpha3":"dom","name":"Dominican Republic"},
  {"id":218,"alpha2":"ec","alpha3":"ecu","name":"Ecuador"},
  {"id":818,"alpha2":"eg","alpha3":"egy","name":"Egypt"},
  {"id":222,"alpha2":"sv","alpha3":"slv","name":"El Salvador"},
  {"id":226,"alpha2":"gq","alpha3":"gnq","name":"Equatorial Guinea"},
  {"id":232,"alpha2":"er","alpha3":"eri","name":"Eritrea"},
  {"id":233,"alpha2":"ee","alpha3":"est","name":"Estonia"},
  {"id":748,"alpha2":"sz","alpha3":"swz","name":"Eswatini"},
  {"id":231,"alpha2":"et","alpha3":"eth","name":"Ethiopia"},
  {"id":242,"alpha2":"fj","alpha3":"fji","name":"Fiji"},
  {"id":246,"alpha2":"fi","alpha3":"fin","name":"Finland"},
  {"id":250,"alpha2":"fr","alpha3":"fra","name":"France"},
  {"id":266,"alpha2":"ga","alpha3":"gab","name":"Gabon"},
  {"id":270,"alpha2":"gm","alpha3":"gmb","name":"Gambia"},
  {"id":268,"alpha2":"ge","alpha3":"geo","name":"Georgia"},
  {"id":276,"alpha2":"de","alpha3":"deu","name":"Germany"},
  {"id":288,"alpha2":"gh","alpha3":"gha","name":"Ghana"},
  {"id":300,"alpha2":"gr","alpha3":"grc","name":"Greece"},
  {"id":308,"alpha2":"gd","alpha3":"grd","name":"Grenada"},
  {"id":320,"alpha2":"gt","alpha3":"gtm","name":"Guatemala"},
  {"id":324,"alpha2":"gn","alpha3":"gin","name":"Guinea"},
  {"id":624,"alpha2":"gw","alpha3":"gnb","name":"Guinea-Bissau"},
  {"id":328,"alpha2":"gy","alpha3":"guy","name":"Guyana"},
  {"id":332,"alpha2":"ht","alpha3":"hti","name":"Haiti"},
  {"id":340,"alpha2":"hn","alpha3":"hnd","name":"Honduras"},
  {"id":348,"alpha2":"hu","alpha3":"hun","name":"Hungary"},
  {"id":352,"alpha2":"is","alpha3":"isl","name":"Iceland"},
  {"id":356,"alpha2":"in","alpha3":"ind","name":"India"},
  {"id":360,"alpha2":"id","alpha3":"idn","name":"Indonesia"},
  {"id":364,"alpha2":"ir","alpha3":"irn","name":"Iran"},
  {"id":368,"alpha2":"iq","alpha3":"irq","name":"Iraq"},
  {"id":372,"alpha2":"ie","alpha3":"irl","name":"Ireland"},
  {"id":376,"alpha2":"il","alpha3":"isr","name":"Israel"},
  {"id":380,"alpha2":"it","alpha3":"ita","name":"Italy"},
  {"id":388,"alpha2":"jm","alpha3":"jam","name":"Jamaica"},
  {"id":392,"alpha2":"jp","alpha3":"jpn","name":"Japan"},
  {"id":400,"alpha2":"jo","alpha3":"jor","name":"Jordan"},
  {"id":398,"alpha2":"kz","alpha3":"kaz","name":"Kazakhstan"},
  {"id":404,"alpha2":"ke","alpha3":"ken","name":"Kenya"},
  {"id":296,"alpha2":"ki","alpha3":"kir","name":"Kiribati"},
  {"id":408,"alpha2":"kp","alpha3":"prk","name":"Democratic People's Republic of Korea"},
  {"id":410,"alpha2":"kr","alpha3":"kor","name":"Republic of Korea"},
  {"id":414,"alpha2":"kw","alpha3":"kwt","name":"Kuwait"},
  {"id":417,"alpha2":"kg","alpha3":"kgz","name":"Kyrgyzstan"},
  {"id":418,"alpha2":"la","alpha3":"lao","name":"Lao People's Democratic Republic"},
  {"id":428,"alpha2":"lv","alpha3":"lva","name":"Latvia"},
  {"id":422,"alpha2":"lb","alpha3":"lbn","name":"Lebanon"},
  {"id":426,"alpha2":"ls","alpha3":"lso","name":"Lesotho"},
  {"id":430,"alpha2":"lr","alpha3":"lbr","name":"Liberia"},
  {"id":434,"alpha2":"ly","alpha3":"lby","name":"Libya"},
  {"id":438,"alpha2":"li","alpha3":"lie","name":"Liechtenstein"},
  {"id":440,"alpha2":"lt","alpha3":"ltu","name":"Lithuania"},
  {"id":442,"alpha2":"lu","alpha3":"lux","name":"Luxembourg"},
  {"id":450,"alpha2":"mg","alpha3":"mdg","name":"Madagascar"},
  {"id":454,"alpha2":"mw","alpha3":"mwi","name":"Malawi"},
  {"id":458,"alpha2":"my","alpha3":"mys","name":"Malaysia"},
  {"id":462,"alpha2":"mv","alpha3":"mdv","name":"Maldives"},
  {"id":466,"alpha2":"ml","alpha3":"mli","name":"Mali"},
  {"id":470,"alpha2":"mt","alpha3":"mlt","name":"Malta"},
  {"id":584,"alpha2":"mh","alpha3":"mhl","name":"Marshall Islands"},
  {"id":478,"alpha2":"mr","alpha3":"mrt","name":"Mauritania"},
  {"id":480,"alpha2":"mu","alpha3":"mus","name":"Mauritius"},
  {"id":484,"alpha2":"mx","alpha3":"mex","name":"Mexico"},
  {"id":583,"alpha2":"fm","alpha3":"fsm","name":"Micronesia"},
  {"id":498,"alpha2":"md","alpha3":"mda","name":"Republic of Moldova"},
  {"id":492,"alpha2":"mc","alpha3":"mco","name":"Monaco"},
  {"id":496,"alpha2":"mn","alpha3":"mng","name":"Mongolia"},
  {"id":499,"alpha2":"me","alpha3":"mne","name":"Montenegro"},
  {"id":504,"alpha2":"ma","alpha3":"mar","name":"Morocco"},
  {"id":508,"alpha2":"mz","alpha3":"moz","name":"Mozambique"},
  {"id":104,"alpha2":"mm","alpha3":"mmr","name":"Myanmar"},
  {"id":516,"alpha2":"na","alpha3":"nam","name":"Namibia"},
  {"id":520,"alpha2":"nr","alpha3":"nru","name":"Nauru"},
  {"id":524,"alpha2":"np","alpha3":"npl","name":"Nepal"},
  {"id":528,"alpha2":"nl","alpha3":"nld","name":"Netherlands"},
  {"id":554,"alpha2":"nz","alpha3":"nzl","name":"New Zealand"},
  {"id":558,"alpha2":"ni","alpha3":"nic","name":"Nicaragua"},
  {"id":562,"alpha2":"ne","alpha3":"ner","name":"Niger"},
  {"id":566,"alpha2":"ng","alpha3":"nga","name":"Nigeria"},
  {"id":807,"alpha2":"mk","alpha3":"mkd","name":"North Macedonia"},
  {"id":578,"alpha2":"no","alpha3":"nor","name":"Norway"},
  {"id":512,"alpha2":"om","alpha3":"omn","name":"Oman"},
  {"id":586,"alpha2":"pk","alpha3":"pak","name":"Pakistan"},
  {"id":585,"alpha2":"pw","alpha3":"plw","name":"Palau"},
  {"id":591,"alpha2":"pa","alpha3":"pan","name":"Panama"},
  {"id":598,"alpha2":"pg","alpha3":"png","name":"Papua New Guinea"},
  {"id":600,"alpha2":"py","alpha3":"pry","name":"Paraguay"},
  {"id":604,"alpha2":"pe","alpha3":"per","name":"Peru"},
  {"id":608,"alpha2":"ph","alpha3":"phl","name":"Philippines"},
  {"id":616,"alpha2":"pl","alpha3":"pol","name":"Poland"},
  {"id":620,"alpha2":"pt","alpha3":"prt","name":"Portugal"},
  {"id":634,"alpha2":"qa","alpha3":"qat","name":"Qatar"},
  {"id":642,"alpha2":"ro","alpha3":"rou","name":"Romania"},
  {"id":643,"alpha2":"ru","alpha3":"rus","name":"Russian Federation"},
  {"id":646,"alpha2":"rw","alpha3":"rwa","name":"Rwanda"},
  {"id":659,"alpha2":"kn","alpha3":"kna","name":"Saint Kitts and Nevis"},
  {"id":662,"alpha2":"lc","alpha3":"lca","name":"Saint Lucia"},
  {"id":670,"alpha2":"vc","alpha3":"vct","name":"Saint Vincent and the Grenadines"},
  {"id":882,"alpha2":"ws","alpha3":"wsm","name":"Samoa"},
  {"id":674,"alpha2":"sm","alpha3":"smr","name":"San Marino"},
  {"id":678,"alpha2":"st","alpha3":"stp","name":"Sao Tome and Principe"},
  {"id":682,"alpha2":"sa","alpha3":"sau","name":"Saudi Arabia"},
  {"id":686,"alpha2":"sn","alpha3":"sen","name":"Senegal"},
  {"id":688,"alpha2":"rs","alpha3":"srb","name":"Serbia"},
  {"id":690,"alpha2":"sc","alpha3":"syc","name":"Seychelles"},
  {"id":694,"alpha2":"sl","alpha3":"sle","name":"Sierra Leone"},
  {"id":702,"alpha2":"sg","alpha3":"sgp","name":"Singapore"},
  {"id":703,"alpha2":"sk","alpha3":"svk","name":"Slovakia"},
  {"id":705,"alpha2":"si","alpha3":"svn","name":"Slovenia"},
  {"id":90,"alpha2":"sb","alpha3":"slb","name":"Solomon Islands"},
  {"id":706,"alpha2":"so","alpha3":"som","name":"Somalia"},
  {"id":710,"alpha2":"za","alpha3":"zaf","name":"South Africa"},
  {"id":728,"alpha2":"ss","alpha3":"ssd","name":"South Sudan"},
  {"id":724,"alpha2":"es","alpha3":"esp","name":"Spain"},
  {"id":144,"alpha2":"lk","alpha3":"lka","name":"Sri Lanka"},
  {"id":729,"alpha2":"sd","alpha3":"sdn","name":"Sudan"},
  {"id":740,"alpha2":"sr","alpha3":"sur","name":"Suriname"},
  {"id":752,"alpha2":"se","alpha3":"swe","name":"Sweden"},
  {"id":756,"alpha2":"ch","alpha3":"che","name":"Switzerland"},
  {"id":760,"alpha2":"sy","alpha3":"syr","name":"Syrian Arab Republic"},
  {"id":762,"alpha2":"tj","alpha3":"tjk","name":"Tajikistan"},
  {"id":834,"alpha2":"tz","alpha3":"tza","name":"Tanzania"},
  {"id":764,"alpha2":"th","alpha3":"tha","name":"Thailand"},
  {"id":626,"alpha2":"tl","alpha3":"tls","name":"Timor-Leste"},
  {"id":768,"alpha2":"tg","alpha3":"tgo","name":"Togo"},
  {"id":776,"alpha2":"to","alpha3":"ton","name":"Tonga"},
  {"id":780,"alpha2":"tt","alpha3":"tto","name":"Trinidad and Tobago"},
  {"id":788,"alpha2":"tn","alpha3":"tun","name":"Tunisia"},
  {"id":792,"alpha2":"tr","alpha3":"tur","name":"Türkiye"},
  {"id":795,"alpha2":"tm","alpha3":"tkm","name":"Turkmenistan"},
  {"id":798,"alpha2":"tv","alpha3":"tuv","name":"Tuvalu"},
  {"id":800,"alpha2":"ug","alpha3":"uga","name":"Uganda"},
  {"id":804,"alpha2":"ua","alpha3":"ukr","name":"Ukraine"},
  {"id":784,"alpha2":"ae","alpha3":"are","name":"United Arab Emirates"},
  {"id":826,"alpha2":"gb","alpha3":"gbr","name":"United Kingdom of Great Britain and Northern Ireland"},
  {"id":840,"alpha2":"us","alpha3":"usa","name":"United States of America"},
  {"id":858,"alpha2":"uy","alpha3":"ury","name":"Uruguay"},
  {"id":860,"alpha2":"uz","alpha3":"uzb","name":"Uzbekistan"},
  {"id":548,"alpha2":"vu","alpha3":"vut","name":"Vanuatu"},
  {"id":862,"alpha2":"ve","alpha3":"ven","name":"Venezuela"},
  {"id":704,"alpha2":"vn","alpha3":"vnm","name":"Vietnam"},
  {"id":887,"alpha2":"ye","alpha3":"yem","name":"Yemen"},
  {"id":894,"alpha2":"zm","alpha3":"zmb","name":"Zambia"},
  {"id":716,"alpha2":"zw","alpha3":"zwe","name":"Zimbabwe"}
]

const mapdata = [
  {
        "country" : "Afghanistan",
        "alpha2" : "AF",
        "alpha3" : "AFG",
        "numeric" : 4,
        "latitude" : 33,
        "longitude" : 65
      },
  {
        "country" : "Albania",
        "alpha2" : "AL",
        "alpha3" : "ALB",
        "numeric" : 8,
        "latitude" : 41,
        "longitude" : 20
      },
  {
        "country" : "Algeria",
        "alpha2" : "DZ",
        "alpha3" : "DZA",
        "numeric" : 12,
        "latitude" : 28,
        "longitude" : 3
      },
  {
        "country" : "Andorra",
        "alpha2" : "AD",
        "alpha3" : "AND",
        "numeric" : 20,
        "latitude" : 42.5,
        "longitude" : 1.6
      },
  {
        "country" : "Angola",
        "alpha2" : "AO",
        "alpha3" : "AGO",
        "numeric" : 24,
        "latitude" : -12.5,
        "longitude" : 18.5
      },
  {
        "country" : "Antigua and Barbuda",
        "alpha2" : "AG",
        "alpha3" : "ATG",
        "numeric" : 28,
        "latitude" : 17.05,
        "longitude" : -61.8
      },
  {
        "country" : "Argentina",
        "alpha2" : "AR",
        "alpha3" : "ARG",
        "numeric" : 32,
        "latitude" : -34,
        "longitude" : -64
      },
  {
        "country" : "Armenia",
        "alpha2" : "AM",
        "alpha3" : "ARM",
        "numeric" : 51,
        "latitude" : 40,
        "longitude" : 45
      },
  {
        "country" : "Australia",
        "alpha2" : "AU",
        "alpha3" : "AUS",
        "numeric" : 36,
        "latitude" : -27,
        "longitude" : 133
      },
  {
        "country" : "Austria",
        "alpha2" : "AT",
        "alpha3" : "AUT",
        "numeric" : 40,
        "latitude" : 47.3333,
        "longitude" : 13.3333
      },
  {
        "country" : "Azerbaijan",
        "alpha2" : "AZ",
        "alpha3" : "AZE",
        "numeric" : 31,
        "latitude" : 40.5,
        "longitude" : 47.5
      },
  {
        "country" : "Bahamas",
        "alpha2" : "BS",
        "alpha3" : "BHS",
        "numeric" : 44,
        "latitude" : 24.25,
        "longitude" : -76
      },
  {
        "country" : "Bahrain",
        "alpha2" : "BH",
        "alpha3" : "BHR",
        "numeric" : 48,
        "latitude" : 26,
        "longitude" : 50.55
      },
  {
        "country" : "Bangladesh",
        "alpha2" : "BD",
        "alpha3" : "BGD",
        "numeric" : 50,
        "latitude" : 24,
        "longitude" : 90
      },
  {
        "country" : "Barbados",
        "alpha2" : "BB",
        "alpha3" : "BRB",
        "numeric" : 52,
        "latitude" : 13.1667,
        "longitude" : -59.5333
      },
  {
        "country" : "Belarus",
        "alpha2" : "BY",
        "alpha3" : "BLR",
        "numeric" : 112,
        "latitude" : 53,
        "longitude" : 28
      },
  {
        "country" : "Belgium",
        "alpha2" : "BE",
        "alpha3" : "BEL",
        "numeric" : 56,
        "latitude" : 50.8333,
        "longitude" : 4
      },
  {
        "country" : "Belize",
        "alpha2" : "BZ",
        "alpha3" : "BLZ",
        "numeric" : 84,
        "latitude" : 17.25,
        "longitude" : -88.75
      },
  {
        "country" : "Benin",
        "alpha2" : "BJ",
        "alpha3" : "BEN",
        "numeric" : 204,
        "latitude" : 9.5,
        "longitude" : 2.25
      },
  {
        "country" : "Bhutan",
        "alpha2" : "BT",
        "alpha3" : "BTN",
        "numeric" : 64,
        "latitude" : 27.5,
        "longitude" : 90.5
      },
  {
        "country" : "Bolivia",
        "alpha2" : "BO",
        "alpha3" : "BOL",
        "numeric" : 68,
        "latitude" : -17,
        "longitude" : -65
      },
  {
        "country" : "Bosnia and Herzegovina",
        "alpha2" : "BA",
        "alpha3" : "BIH",
        "numeric" : 70,
        "latitude" : 44,
        "longitude" : 18
      },
  {
        "country" : "Botswana",
        "alpha2" : "BW",
        "alpha3" : "BWA",
        "numeric" : 72,
        "latitude" : -22,
        "longitude" : 24
      },
  {
        "country" : "Brazil",
        "alpha2" : "BR",
        "alpha3" : "BRA",
        "numeric" : 76,
        "latitude" : -10,
        "longitude" : -55
      },
  {
        "country" : "Brunei Darussalam",
        "alpha2" : "BN",
        "alpha3" : "BRN",
        "numeric" : 96,
        "latitude" : 4.5,
        "longitude" : 114.6667
      },
  {
        "country" : "Bulgaria",
        "alpha2" : "BG",
        "alpha3" : "BGR",
        "numeric" : 100,
        "latitude" : 43,
        "longitude" : 25
      },
  {
        "country" : "Burkina Faso",
        "alpha2" : "BF",
        "alpha3" : "BFA",
        "numeric" : 854,
        "latitude" : 13,
        "longitude" : -2
      },
  {
        "country" : "Burundi",
        "alpha2" : "BI",
        "alpha3" : "BDI",
        "numeric" : 108,
        "latitude" : -3.5,
        "longitude" : 30
      },
  {
        "country" : "Cambodia",
        "alpha2" : "KH",
        "alpha3" : "KHM",
        "numeric" : 116,
        "latitude" : 13,
        "longitude" : 105
      },
  {
        "country" : "Cameroon",
        "alpha2" : "CM",
        "alpha3" : "CMR",
        "numeric" : 120,
        "latitude" : 6,
        "longitude" : 12
      },
  {
        "country" : "Canada",
        "alpha2" : "CA",
        "alpha3" : "CAN",
        "numeric" : 124,
        "latitude" : 60,
        "longitude" : -95
      },
  {
        "country" : "Cape Verde",
        "alpha2" : "CV",
        "alpha3" : "CPV",
        "numeric" : 132,
        "latitude" : 16,
        "longitude" : -24
      },
  {
        "country" : "Central African Republic",
        "alpha2" : "CF",
        "alpha3" : "CAF",
        "numeric" : 140,
        "latitude" : 7,
        "longitude" : 21
      },
  {
        "country" : "Chad",
        "alpha2" : "TD",
        "alpha3" : "TCD",
        "numeric" : 148,
        "latitude" : 15,
        "longitude" : 19
      },
  {
        "country" : "Chile",
        "alpha2" : "CL",
        "alpha3" : "CHL",
        "numeric" : 152,
        "latitude" : -30,
        "longitude" : -71
      },
  {
        "country" : "China",
        "alpha2" : "CN",
        "alpha3" : "CHN",
        "numeric" : 156,
        "latitude" : 35,
        "longitude" : 105
      },
  {
        "country" : "Colombia",
        "alpha2" : "CO",
        "alpha3" : "COL",
        "numeric" : 170,
        "latitude" : 4,
        "longitude" : -72
      },
  {
        "country" : "Comoros",
        "alpha2" : "KM",
        "alpha3" : "COM",
        "numeric" : 174,
        "latitude" : -12.1667,
        "longitude" : 44.25
      },
  {
        "country" : "Congo",
        "alpha2" : "CG",
        "alpha3" : "COG",
        "numeric" : 178,
        "latitude" : -1,
        "longitude" : 15
      },
  {
        "country" : "The Democratic Republic of the Congo",
        "alpha2" : "CD",
        "alpha3" : "COD",
        "numeric" : 180,
        "latitude" : 0,
        "longitude" : 25
      },
  {
        "country" : "Costa Rica",
        "alpha2" : "CR",
        "alpha3" : "CRI",
        "numeric" : 188,
        "latitude" : 10,
        "longitude" : -84
      },
  {
        "country" : "Cote d'Ivoire",
        "alpha2" : "CI",
        "alpha3" : "CIV",
        "numeric" : 384,
        "latitude" : 8,
        "longitude" : -5
      },
  {
        "country" : "Croatia",
        "alpha2" : "HR",
        "alpha3" : "HRV",
        "numeric" : 191,
        "latitude" : 45.1667,
        "longitude" : 15.5
      },
  {
        "country" : "Cuba",
        "alpha2" : "CU",
        "alpha3" : "CUB",
        "numeric" : 192,
        "latitude" : 21.5,
        "longitude" : -80
      },
  {
        "country" : "Cyprus",
        "alpha2" : "CY",
        "alpha3" : "CYP",
        "numeric" : 196,
        "latitude" : 35,
        "longitude" : 33
      },
  {
        "country" : "Czech Republic",
        "alpha2" : "CZ",
        "alpha3" : "CZE",
        "numeric" : 203,
        "latitude" : 49.75,
        "longitude" : 15.5
      },
  {
        "country" : "Denmark",
        "alpha2" : "DK",
        "alpha3" : "DNK",
        "numeric" : 208,
        "latitude" : 56,
        "longitude" : 10
      },
  {
        "country" : "Djibouti",
        "alpha2" : "DJ",
        "alpha3" : "DJI",
        "numeric" : 262,
        "latitude" : 11.5,
        "longitude" : 43
      },
  {
        "country" : "Dominica",
        "alpha2" : "DM",
        "alpha3" : "DMA",
        "numeric" : 212,
        "latitude" : 15.4167,
        "longitude" : -61.3333
      },
  {
        "country" : "Dominican Republic",
        "alpha2" : "DO",
        "alpha3" : "DOM",
        "numeric" : 214,
        "latitude" : 19,
        "longitude" : -70.6667
      },
  {
        "country" : "Ecuador",
        "alpha2" : "EC",
        "alpha3" : "ECU",
        "numeric" : 218,
        "latitude" : -2,
        "longitude" : -77.5
      },
  {
        "country" : "Egypt",
        "alpha2" : "EG",
        "alpha3" : "EGY",
        "numeric" : 818,
        "latitude" : 27,
        "longitude" : 30
      },
  {
        "country" : "El Salvador",
        "alpha2" : "SV",
        "alpha3" : "SLV",
        "numeric" : 222,
        "latitude" : 13.8333,
        "longitude" : -88.9167
      },
  {
        "country" : "Equatorial Guinea",
        "alpha2" : "GQ",
        "alpha3" : "GNQ",
        "numeric" : 226,
        "latitude" : 2,
        "longitude" : 10
      },
  {
        "country" : "Eritrea",
        "alpha2" : "ER",
        "alpha3" : "ERI",
        "numeric" : 232,
        "latitude" : 15,
        "longitude" : 39
      },
  {
        "country" : "Estonia",
        "alpha2" : "EE",
        "alpha3" : "EST",
        "numeric" : 233,
        "latitude" : 59,
        "longitude" : 26
      },
  {
        "country" : "Ethiopia",
        "alpha2" : "ET",
        "alpha3" : "ETH",
        "numeric" : 231,
        "latitude" : 8,
        "longitude" : 38
      },
  {
        "country" : "Faroe Islands",
        "alpha2" : "FO",
        "alpha3" : "FRO",
        "numeric" : 234,
        "latitude" : 62,
        "longitude" : -7
      },
  {
        "country" : "Fiji",
        "alpha2" : "FJ",
        "alpha3" : "FJI",
        "numeric" : 242,
        "latitude" : -18,
        "longitude" : 175
      },
  {
        "country" : "Finland",
        "alpha2" : "FI",
        "alpha3" : "FIN",
        "numeric" : 246,
        "latitude" : 64,
        "longitude" : 26
      },
  {
        "country" : "France",
        "alpha2" : "FR",
        "alpha3" : "FRA",
        "numeric" : 250,
        "latitude" : 46,
        "longitude" : 2
      },
  {
        "country" : "French Guiana",
        "alpha2" : "GF",
        "alpha3" : "GUF",
        "numeric" : 254,
        "latitude" : 4,
        "longitude" : -53
      },
  {
        "country" : "French Polynesia",
        "alpha2" : "PF",
        "alpha3" : "PYF",
        "numeric" : 258,
        "latitude" : -15,
        "longitude" : -140
      },
  {
        "country" : "Gabon",
        "alpha2" : "GA",
        "alpha3" : "GAB",
        "numeric" : 266,
        "latitude" : -1,
        "longitude" : 11.75
      },
  {
        "country" : "Gambia",
        "alpha2" : "GM",
        "alpha3" : "GMB",
        "numeric" : 270,
        "latitude" : 13.4667,
        "longitude" : -16.5667
      },
  {
        "country" : "Georgia",
        "alpha2" : "GE",
        "alpha3" : "GEO",
        "numeric" : 268,
        "latitude" : 42,
        "longitude" : 43.5
      },
  {
        "country" : "Germany",
        "alpha2" : "DE",
        "alpha3" : "DEU",
        "numeric" : 276,
        "latitude" : 51,
        "longitude" : 9
      },
  {
        "country" : "Ghana",
        "alpha2" : "GH",
        "alpha3" : "GHA",
        "numeric" : 288,
        "latitude" : 8,
        "longitude" : -2
      },
  {
        "country" : "Greece",
        "alpha2" : "GR",
        "alpha3" : "GRC",
        "numeric" : 300,
        "latitude" : 39,
        "longitude" : 22
      },
  {
        "country" : "Greenland",
        "alpha2" : "GL",
        "alpha3" : "GRL",
        "numeric" : 304,
        "latitude" : 72,
        "longitude" : -40
      },
  {
        "country" : "Grenada",
        "alpha2" : "GD",
        "alpha3" : "GRD",
        "numeric" : 308,
        "latitude" : 12.1167,
        "longitude" : -61.6667
      },
  {
        "country" : "Guatemala",
        "alpha2" : "GT",
        "alpha3" : "GTM",
        "numeric" : 320,
        "latitude" : 15.5,
        "longitude" : -90.25
      },
  {
        "country" : "Guinea",
        "alpha2" : "GN",
        "alpha3" : "GIN",
        "numeric" : 324,
        "latitude" : 11,
        "longitude" : -10
      },
  {
        "country" : "Guinea-Bissau",
        "alpha2" : "GW",
        "alpha3" : "GNB",
        "numeric" : 624,
        "latitude" : 12,
        "longitude" : -15
      },
  {
        "country" : "Guyana",
        "alpha2" : "GY",
        "alpha3" : "GUY",
        "numeric" : 328,
        "latitude" : 5,
        "longitude" : -59
      },
  {
        "country" : "Haiti",
        "alpha2" : "HT",
        "alpha3" : "HTI",
        "numeric" : 332,
        "latitude" : 19,
        "longitude" : -72.4167
      },
  {
        "country" : "Vatican City",
        "alpha2" : "VA",
        "alpha3" : "VAT",
        "numeric" : 336,
        "latitude" : 41.9,
        "longitude" : 12.45
      },
  {
        "country" : "Honduras",
        "alpha2" : "HN",
        "alpha3" : "HND",
        "numeric" : 340,
        "latitude" : 15,
        "longitude" : -86.5
      },
  {
        "country" : "Hungary",
        "alpha2" : "HU",
        "alpha3" : "HUN",
        "numeric" : 348,
        "latitude" : 47,
        "longitude" : 20
      },
  {
        "country" : "Iceland",
        "alpha2" : "IS",
        "alpha3" : "ISL",
        "numeric" : 352,
        "latitude" : 65,
        "longitude" : -18
      },
  {
        "country" : "India",
        "alpha2" : "IN",
        "alpha3" : "IND",
        "numeric" : 356,
        "latitude" : 20,
        "longitude" : 77
      },
  {
        "country" : "Indonesia",
        "alpha2" : "ID",
        "alpha3" : "IDN",
        "numeric" : 360,
        "latitude" : -5,
        "longitude" : 120
      },
  {
        "country" : "Iran",
        "alpha2" : "IR",
        "alpha3" : "IRN",
        "numeric" : 364,
        "latitude" : 32,
        "longitude" : 53
      },
  {
        "country" : "Iraq",
        "alpha2" : "IQ",
        "alpha3" : "IRQ",
        "numeric" : 368,
        "latitude" : 33,
        "longitude" : 44
      },
  {
        "country" : "Ireland",
        "alpha2" : "IE",
        "alpha3" : "IRL",
        "numeric" : 372,
        "latitude" : 53,
        "longitude" : -8
      },
  {
        "country" : "Israel",
        "alpha2" : "IL",
        "alpha3" : "ISR",
        "numeric" : 376,
        "latitude" : 31.5,
        "longitude" : 34.75
      },
  {
        "country" : "Italy",
        "alpha2" : "IT",
        "alpha3" : "ITA",
        "numeric" : 380,
        "latitude" : 42.8333,
        "longitude" : 12.8333
      },
  {
        "country" : "Jamaica",
        "alpha2" : "JM",
        "alpha3" : "JAM",
        "numeric" : 388,
        "latitude" : 18.25,
        "longitude" : -77.5
      },
  {
        "country" : "Japan",
        "alpha2" : "JP",
        "alpha3" : "JPN",
        "numeric" : 392,
        "latitude" : 36,
        "longitude" : 138
      },
  {
        "country" : "Jordan",
        "alpha2" : "JO",
        "alpha3" : "JOR",
        "numeric" : 400,
        "latitude" : 31,
        "longitude" : 36
      },
  {
        "country" : "Kazakhstan",
        "alpha2" : "KZ",
        "alpha3" : "KAZ",
        "numeric" : 398,
        "latitude" : 48,
        "longitude" : 68
      },
  {
        "country" : "Kenya",
        "alpha2" : "KE",
        "alpha3" : "KEN",
        "numeric" : 404,
        "latitude" : 1,
        "longitude" : 38
      },
  {
        "country" : "Kiribati",
        "alpha2" : "KI",
        "alpha3" : "KIR",
        "numeric" : 296,
        "latitude" : 1.4167,
        "longitude" : 173
      },
  {
        "country" : "Korea, Democratic People's Republic of",
        "alpha2" : "KP",
        "alpha3" : "PRK",
        "numeric" : 408,
        "latitude" : 40,
        "longitude" : 127
      },
  {
        "country" : "Korea, Republic of",
        "alpha2" : "KR",
        "alpha3" : "KOR",
        "numeric" : 410,
        "latitude" : 37,
        "longitude" : 127.5
      },
  {
        "country" : "Kuwait",
        "alpha2" : "KW",
        "alpha3" : "KWT",
        "numeric" : 414,
        "latitude" : 29.3375,
        "longitude" : 47.6581
      },
  {
        "country" : "Kyrgyzstan",
        "alpha2" : "KG",
        "alpha3" : "KGZ",
        "numeric" : 417,
        "latitude" : 41,
        "longitude" : 75
      },
  {
        "country" : "Lao People's Democratic Republic",
        "alpha2" : "LA",
        "alpha3" : "LAO",
        "numeric" : 418,
        "latitude" : 18,
        "longitude" : 105
      },
  {
        "country" : "Latvia",
        "alpha2" : "LV",
        "alpha3" : "LVA",
        "numeric" : 428,
        "latitude" : 57,
        "longitude" : 25
      },
  {
        "country" : "Lebanon",
        "alpha2" : "LB",
        "alpha3" : "LBN",
        "numeric" : 422,
        "latitude" : 33.8333,
        "longitude" : 35.8333
      },
  {
        "country" : "Lesotho",
        "alpha2" : "LS",
        "alpha3" : "LSO",
        "numeric" : 426,
        "latitude" : -29.5,
        "longitude" : 28.5
      },
  {
        "country" : "Liberia",
        "alpha2" : "LR",
        "alpha3" : "LBR",
        "numeric" : 430,
        "latitude" : 6.5,
        "longitude" : -9.5
      },
  {
        "country" : "Libyan Arab Jamahiriya",
        "alpha2" : "LY",
        "alpha3" : "LBY",
        "numeric" : 434,
        "latitude" : 25,
        "longitude" : 17
      },
  {
        "country" : "Liechtenstein",
        "alpha2" : "LI",
        "alpha3" : "LIE",
        "numeric" : 438,
        "latitude" : 47.1667,
        "longitude" : 9.5333
      },
  {
        "country" : "Lithuania",
        "alpha2" : "LT",
        "alpha3" : "LTU",
        "numeric" : 440,
        "latitude" : 56,
        "longitude" : 24
      },
  {
        "country" : "Luxembourg",
        "alpha2" : "LU",
        "alpha3" : "LUX",
        "numeric" : 442,
        "latitude" : 49.75,
        "longitude" : 6.1667
      },
  {
        "country" : "Macedonia, the former Yugoslav Republic of",
        "alpha2" : "MK",
        "alpha3" : "MKD",
        "numeric" : 807,
        "latitude" : 41.8333,
        "longitude" : 22
      },
  {
        "country" : "Madagascar",
        "alpha2" : "MG",
        "alpha3" : "MDG",
        "numeric" : 450,
        "latitude" : -20,
        "longitude" : 47
      },
  {
        "country" : "Malawi",
        "alpha2" : "MW",
        "alpha3" : "MWI",
        "numeric" : 454,
        "latitude" : -13.5,
        "longitude" : 34
      },
  {
        "country" : "Malaysia",
        "alpha2" : "MY",
        "alpha3" : "MYS",
        "numeric" : 458,
        "latitude" : 2.5,
        "longitude" : 112.5
      },
  {
        "country" : "Maldives",
        "alpha2" : "MV",
        "alpha3" : "MDV",
        "numeric" : 462,
        "latitude" : 3.25,
        "longitude" : 73
      },
  {
        "country" : "Mali",
        "alpha2" : "ML",
        "alpha3" : "MLI",
        "numeric" : 466,
        "latitude" : 17,
        "longitude" : -4
      },
  {
        "country" : "Malta",
        "alpha2" : "MT",
        "alpha3" : "MLT",
        "numeric" : 470,
        "latitude" : 35.8333,
        "longitude" : 14.5833
      },
  {
        "country" : "Marshall Islands",
        "alpha2" : "MH",
        "alpha3" : "MHL",
        "numeric" : 584,
        "latitude" : 9,
        "longitude" : 168
      },
  {
        "country" : "Mauritania",
        "alpha2" : "MR",
        "alpha3" : "MRT",
        "numeric" : 478,
        "latitude" : 20,
        "longitude" : -12
      },
  {
        "country" : "Mauritius",
        "alpha2" : "MU",
        "alpha3" : "MUS",
        "numeric" : 480,
        "latitude" : -20.2833,
        "longitude" : 57.55
      },
  {
        "country" : "Mexico",
        "alpha2" : "MX",
        "alpha3" : "MEX",
        "numeric" : 484,
        "latitude" : 23,
        "longitude" : -102
      },
  {
        "country" : "Moldova, Republic of",
        "alpha2" : "MD",
        "alpha3" : "MDA",
        "numeric" : 498,
        "latitude" : 47,
        "longitude" : 29
      },
  {
        "country" : "Monaco",
        "alpha2" : "MC",
        "alpha3" : "MCO",
        "numeric" : 492,
        "latitude" : 43.7333,
        "longitude" : 7.4
      },
  {
        "country" : "Mongolia",
        "alpha2" : "MN",
        "alpha3" : "MNG",
        "numeric" : 496,
        "latitude" : 46,
        "longitude" : 105
      },
  {
        "country" : "Montenegro",
        "alpha2" : "ME",
        "alpha3" : "MNE",
        "numeric" : 499,
        "latitude" : 42,
        "longitude" : 19
      },
  {
        "country" : "Morocco",
        "alpha2" : "MA",
        "alpha3" : "MAR",
        "numeric" : 504,
        "latitude" : 32,
        "longitude" : -5
      },
  {
        "country" : "Mozambique",
        "alpha2" : "MZ",
        "alpha3" : "MOZ",
        "numeric" : 508,
        "latitude" : -18.25,
        "longitude" : 35
      },
  {
        "country" : "Myanmar",
        "alpha2" : "MM",
        "alpha3" : "MMR",
        "numeric" : 104,
        "latitude" : 22,
        "longitude" : 98
      },
  {
        "country" : "Namibia",
        "alpha2" : "NA",
        "alpha3" : "NAM",
        "numeric" : 516,
        "latitude" : -22,
        "longitude" : 17
      },
  {
        "country" : "Nauru",
        "alpha2" : "NR",
        "alpha3" : "NRU",
        "numeric" : 520,
        "latitude" : -0.5333,
        "longitude" : 166.9167
      },
  {
        "country" : "Nepal",
        "alpha2" : "NP",
        "alpha3" : "NPL",
        "numeric" : 524,
        "latitude" : 28,
        "longitude" : 84
      },
  {
        "country" : "Netherlands",
        "alpha2" : "NL",
        "alpha3" : "NLD",
        "numeric" : 528,
        "latitude" : 52.5,
        "longitude" : 5.75
      },
  {
        "country" : "New Zealand",
        "alpha2" : "NZ",
        "alpha3" : "NZL",
        "numeric" : 554,
        "latitude" : -41,
        "longitude" : 174
      },
  {
        "country" : "Nicaragua",
        "alpha2" : "NI",
        "alpha3" : "NIC",
        "numeric" : 558,
        "latitude" : 13,
        "longitude" : -85
      },
  {
        "country" : "Niger",
        "alpha2" : "NE",
        "alpha3" : "NER",
        "numeric" : 562,
        "latitude" : 16,
        "longitude" : 8
      },
  {
        "country" : "Nigeria",
        "alpha2" : "NG",
        "alpha3" : "NGA",
        "numeric" : 566,
        "latitude" : 10,
        "longitude" : 8
      },
  {
        "country" : "Norway",
        "alpha2" : "NO",
        "alpha3" : "NOR",
        "numeric" : 578,
        "latitude" : 62,
        "longitude" : 10
      },
  {
        "country" : "Oman",
        "alpha2" : "OM",
        "alpha3" : "OMN",
        "numeric" : 512,
        "latitude" : 21,
        "longitude" : 57
      },
  {
        "country" : "Pakistan",
        "alpha2" : "PK",
        "alpha3" : "PAK",
        "numeric" : 586,
        "latitude" : 30,
        "longitude" : 70
      },
  {
        "country" : "Palau",
        "alpha2" : "PW",
        "alpha3" : "PLW",
        "numeric" : 585,
        "latitude" : 7.5,
        "longitude" : 134.5
      },
  {
        "country" : "Palestinian Territory, Occupied",
        "alpha2" : "PS",
        "alpha3" : "PSE",
        "numeric" : 275,
        "latitude" : 32,
        "longitude" : 35.25
      },
  {
        "country" : "Panama",
        "alpha2" : "PA",
        "alpha3" : "PAN",
        "numeric" : 591,
        "latitude" : 9,
        "longitude" : -80
      },
  {
        "country" : "Papua New Guinea",
        "alpha2" : "PG",
        "alpha3" : "PNG",
        "numeric" : 598,
        "latitude" : -6,
        "longitude" : 147
      },
  {
        "country" : "Paraguay",
        "alpha2" : "PY",
        "alpha3" : "PRY",
        "numeric" : 600,
        "latitude" : -23,
        "longitude" : -58
      },
  {
        "country" : "Peru",
        "alpha2" : "PE",
        "alpha3" : "PER",
        "numeric" : 604,
        "latitude" : -10,
        "longitude" : -76
      },
  {
        "country" : "Philippines",
        "alpha2" : "PH",
        "alpha3" : "PHL",
        "numeric" : 608,
        "latitude" : 13,
        "longitude" : 122
      },
  {
        "country" : "Poland",
        "alpha2" : "PL",
        "alpha3" : "POL",
        "numeric" : 616,
        "latitude" : 52,
        "longitude" : 20
      },
  {
        "country" : "Portugal",
        "alpha2" : "PT",
        "alpha3" : "PRT",
        "numeric" : 620,
        "latitude" : 39.5,
        "longitude" : -8
      },
  {
        "country" : "Puerto Rico",
        "alpha2" : "PR",
        "alpha3" : "PRI",
        "numeric" : 630,
        "latitude" : 18.25,
        "longitude" : -66.5
      },
  {
        "country" : "Qatar",
        "alpha2" : "QA",
        "alpha3" : "QAT",
        "numeric" : 634,
        "latitude" : 25.5,
        "longitude" : 51.25
      },
  {
        "country" : "Romania",
        "alpha2" : "RO",
        "alpha3" : "ROU",
        "numeric" : 642,
        "latitude" : 46,
        "longitude" : 25
      },
  {
        "country" : "Russian Federation",
        "alpha2" : "RU",
        "alpha3" : "RUS",
        "numeric" : 643,
        "latitude" : 60,
        "longitude" : 100
      },
  {
        "country" : "Rwanda",
        "alpha2" : "RW",
        "alpha3" : "RWA",
        "numeric" : 646,
        "latitude" : -2,
        "longitude" : 30
      },
  {
        "country" : "Saint Helena, Ascension and Tristan da Cunha",
        "alpha2" : "SH",
        "alpha3" : "SHN",
        "numeric" : 654,
        "latitude" : -15.9333,
        "longitude" : -5.7
      },
  {
        "country" : "Saint Kitts and Nevis",
        "alpha2" : "KN",
        "alpha3" : "KNA",
        "numeric" : 659,
        "latitude" : 17.3333,
        "longitude" : -62.75
      },
  {
        "country" : "Saint Lucia",
        "alpha2" : "LC",
        "alpha3" : "LCA",
        "numeric" : 662,
        "latitude" : 13.8833,
        "longitude" : -61.1333
      },
  {
        "country" : "Saint Vincent and the Grenadines",
        "alpha2" : "VC",
        "alpha3" : "VCT",
        "numeric" : 670,
        "latitude" : 13.25,
        "longitude" : -61.2
      },
  {
        "country" : "Samoa",
        "alpha2" : "WS",
        "alpha3" : "WSM",
        "numeric" : 882,
        "latitude" : -13.5833,
        "longitude" : -172.3333
      },
  {
        "country" : "San Marino",
        "alpha2" : "SM",
        "alpha3" : "SMR",
        "numeric" : 674,
        "latitude" : 43.7667,
        "longitude" : 12.4167
      },
  {
        "country" : "Sao Tome and Principe",
        "alpha2" : "ST",
        "alpha3" : "STP",
        "numeric" : 678,
        "latitude" : 1,
        "longitude" : 7
      },
  {
        "country" : "Saudi Arabia",
        "alpha2" : "SA",
        "alpha3" : "SAU",
        "numeric" : 682,
        "latitude" : 25,
        "longitude" : 45
      },
  {
        "country" : "Senegal",
        "alpha2" : "SN",
        "alpha3" : "SEN",
        "numeric" : 686,
        "latitude" : 14,
        "longitude" : -14
      },
  {
        "country" : "Serbia",
        "alpha2" : "RS",
        "alpha3" : "SRB",
        "numeric" : 688,
        "latitude" : 44,
        "longitude" : 21
      },
  {
        "country" : "Seychelles",
        "alpha2" : "SC",
        "alpha3" : "SYC",
        "numeric" : 690,
        "latitude" : -4.5833,
        "longitude" : 55.6667
      },
  {
        "country" : "Sierra Leone",
        "alpha2" : "SL",
        "alpha3" : "SLE",
        "numeric" : 694,
        "latitude" : 8.5,
        "longitude" : -11.5
      },
  {
        "country" : "Singapore",
        "alpha2" : "SG",
        "alpha3" : "SGP",
        "numeric" : 702,
        "latitude" : 1.3667,
        "longitude" : 103.8
      },
  {
        "country" : "Slovakia",
        "alpha2" : "SK",
        "alpha3" : "SVK",
        "numeric" : 703,
        "latitude" : 48.6667,
        "longitude" : 19.5
      },
  {
        "country" : "Slovenia",
        "alpha2" : "SI",
        "alpha3" : "SVN",
        "numeric" : 705,
        "latitude" : 46,
        "longitude" : 15
      },
  {
        "country" : "Solomon Islands",
        "alpha2" : "SB",
        "alpha3" : "SLB",
        "numeric" : 90,
        "latitude" : -8,
        "longitude" : 159
      },
  {
        "country" : "Somalia",
        "alpha2" : "SO",
        "alpha3" : "SOM",
        "numeric" : 706,
        "latitude" : 10,
        "longitude" : 49
      },
  {
        "country" : "South Africa",
        "alpha2" : "ZA",
        "alpha3" : "ZAF",
        "numeric" : 710,
        "latitude" : -29,
        "longitude" : 24
      },
  {
        "country" : "Spain",
        "alpha2" : "ES",
        "alpha3" : "ESP",
        "numeric" : 724,
        "latitude" : 40,
        "longitude" : -4
      },
  {
        "country" : "Sri Lanka",
        "alpha2" : "LK",
        "alpha3" : "LKA",
        "numeric" : 144,
        "latitude" : 7,
        "longitude" : 81
      },
  {
        "country" : "Sudan",
        "alpha2" : "SD",
        "alpha3" : "SDN",
        "numeric" : 736,
        "latitude" : 15,
        "longitude" : 30
      },
  {
        "country" : "Suriname",
        "alpha2" : "SR",
        "alpha3" : "SUR",
        "numeric" : 740,
        "latitude" : 4,
        "longitude" : -56
      },
  {
        "country" : "Swaziland",
        "alpha2" : "SZ",
        "alpha3" : "SWZ",
        "numeric" : 748,
        "latitude" : -26.5,
        "longitude" : 31.5
      },
  {
        "country" : "Sweden",
        "alpha2" : "SE",
        "alpha3" : "SWE",
        "numeric" : 752,
        "latitude" : 62,
        "longitude" : 15
      },
  {
        "country" : "Switzerland",
        "alpha2" : "CH",
        "alpha3" : "CHE",
        "numeric" : 756,
        "latitude" : 47,
        "longitude" : 8
      },
  {
        "country" : "Syrian Arab Republic",
        "alpha2" : "SY",
        "alpha3" : "SYR",
        "numeric" : 760,
        "latitude" : 35,
        "longitude" : 38
      },
  {
        "country" : "Taiwan, Province of China",
        "alpha2" : "TW",
        "alpha3" : "TWN",
        "numeric" : 158,
        "latitude" : 23.5,
        "longitude" : 121
      },
  {
        "country" : "Tajikistan",
        "alpha2" : "TJ",
        "alpha3" : "TJK",
        "numeric" : 762,
        "latitude" : 39,
        "longitude" : 71
      },
  {
        "country" : "Tanzania, United Republic of",
        "alpha2" : "TZ",
        "alpha3" : "TZA",
        "numeric" : 834,
        "latitude" : -6,
        "longitude" : 35
      },
  {
        "country" : "Thailand",
        "alpha2" : "TH",
        "alpha3" : "THA",
        "numeric" : 764,
        "latitude" : 15,
        "longitude" : 100
      },
  {
        "country" : "Timor-Leste",
        "alpha2" : "TL",
        "alpha3" : "TLS",
        "numeric" : 626,
        "latitude" : -8.55,
        "longitude" : 125.5167
      },
  {
        "country" : "Togo",
        "alpha2" : "TG",
        "alpha3" : "TGO",
        "numeric" : 768,
        "latitude" : 8,
        "longitude" : 1.1667
      },
  {
        "country" : "Tonga",
        "alpha2" : "TO",
        "alpha3" : "TON",
        "numeric" : 776,
        "latitude" : -20,
        "longitude" : -175
      },
  {
        "country" : "Trinidad and Tobago",
        "alpha2" : "TT",
        "alpha3" : "TTO",
        "numeric" : 780,
        "latitude" : 11,
        "longitude" : -61
      },
  {
        "country" : "Tunisia",
        "alpha2" : "TN",
        "alpha3" : "TUN",
        "numeric" : 788,
        "latitude" : 34,
        "longitude" : 9
      },
  {
        "country" : "Turkey",
        "alpha2" : "TR",
        "alpha3" : "TUR",
        "numeric" : 792,
        "latitude" : 39,
        "longitude" : 35
      },
  {
        "country" : "Turkmenistan",
        "alpha2" : "TM",
        "alpha3" : "TKM",
        "numeric" : 795,
        "latitude" : 40,
        "longitude" : 60
      },
  {
        "country" : "Uganda",
        "alpha2" : "UG",
        "alpha3" : "UGA",
        "numeric" : 800,
        "latitude" : 1,
        "longitude" : 32
      },
  {
        "country" : "Ukraine",
        "alpha2" : "UA",
        "alpha3" : "UKR",
        "numeric" : 804,
        "latitude" : 49,
        "longitude" : 32
      },
  {
        "country" : "United Arab Emirates",
        "alpha2" : "AE",
        "alpha3" : "ARE",
        "numeric" : 784,
        "latitude" : 24,
        "longitude" : 54
      },
  {
        "country" : "United Kingdom",
        "alpha2" : "GB",
        "alpha3" : "GBR",
        "numeric" : 826,
        "latitude" : 54,
        "longitude" : -2
      },
  {
        "country" : "United States",
        "alpha2" : "US",
        "alpha3" : "USA",
        "numeric" : 840,
        "latitude" : 38,
        "longitude" : -97
      },
  {
        "country" : "Uruguay",
        "alpha2" : "UY",
        "alpha3" : "URY",
        "numeric" : 858,
        "latitude" : -33,
        "longitude" : -56
      },
  {
        "country" : "Uzbekistan",
        "alpha2" : "UZ",
        "alpha3" : "UZB",
        "numeric" : 860,
        "latitude" : 41,
        "longitude" : 64
      },
  {
        "country" : "Vanuatu",
        "alpha2" : "VU",
        "alpha3" : "VUT",
        "numeric" : 548,
        "latitude" : -16,
        "longitude" : 167
      },
  {
        "country" : "Venezuela, Bolivarian Republic of",
        "alpha2" : "VE",
        "alpha3" : "VEN",
        "numeric" : 862,
        "latitude" : 8,
        "longitude" : -66
      },
  {
        "country" : "Vietnam",
        "alpha2" : "VN",
        "alpha3" : "VNM",
        "numeric" : 704,
        "latitude" : 16,
        "longitude" : 106
      },
  {
        "country" : "Yemen",
        "alpha2" : "YE",
        "alpha3" : "YEM",
        "numeric" : 887,
        "latitude" : 15,
        "longitude" : 48
      },
  {
        "country" : "Zambia",
        "alpha2" : "ZM",
        "alpha3" : "ZMB",
        "numeric" : 894,
        "latitude" : -15,
        "longitude" : 30
      },
  {
        "country" : "Zimbabwe",
        "alpha2" : "ZW",
        "alpha3" : "ZWE",
        "numeric" : 716,
        "latitude" : -20,
        "longitude" : 30
      },
];



var goalCountry = mapdata[0];

function getFlagForCountry(country) {
  return 
}

function submitGuess() {
  var guessAlpha = document.getElementById('myInput').getAttribute('country-code');
  console.log("GuessAlpha: ", guessAlpha);
  if(guessAlpha == goalCountry.alpha2) {
    console.log("Correct");
    document.getElementById('previous-guesses').innerHTML = "";
    getRandomCountry();
  } else {
    guessCountry = mapdata.find(elem => elem.alpha2 == guessAlpha.toUpperCase());
    console.log("Guessed country: ", guessCountry);
    var distToCountry = calculateDist(guessCountry, goalCountry);
    var headingToCountry = angleFromCoordinate(guessCountry, goalCountry);

    let wrongGuess = document.createElement('div');
    wrongGuess.innerHTML = `
    <div class="row">
      <div class="col-md-2">
      <img id="question-img" src="countries_flags/${guessCountry.alpha2.toLowerCase()}.svg" width="30px" height="20px"/>
      </div>
      <div class="col-md-6">
      ${guessCountry.country}
      </div>
      <div class="col-md-3">
      ${distToCountry} km
      </div>
      <div class="col-md-1">
                  <span style="writing-mode: vertical-lr; -webkit-transform:rotate(${headingToCountry}deg);">&larr;</span>
      </div>
    </row>
    `;
    document.getElementById('previous-guesses').appendChild(wrongGuess);
  }
  document.getElementById('myInput').value = "";
}



