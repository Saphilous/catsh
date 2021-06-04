const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

async function main(params) {
    var analresults
    const texttoanal = params.analtexts
	
	const analyzeParams = {
      'text': texttoanal,
      'features': {
        'entities': {
          'emotion': true,
          'sentiment': true,
          'limit': 2,
        },
        'keywords': {
          'emotion': true,
          'sentiment': true,
          'limit': 2,
        },
      }
	};
	
    let naturalLanguageUnderstanding
    try {
        naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
            version: '2020-08-01',
            authenticator: new IamAuthenticator({
            apikey: 'CPmMl9sQsG-2R2dDju3etEWva8ElQKxyeHYZx4V7Y1F0',
            }),
            serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/1bcae669-efa9-4160-9535-18d3807000a3',
        });
    }
    catch {
        return({"Err": "tis an eeror my fren"})
    }

    async function natund(naturalLanguageUnderstanding)
    {
        let result
        console.log("hellos")
        await naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
            result = analysisResults
            return ({"answer": analresults})
        }).catch(err => {
                console.log('error:', err);
                return({"err": "sorry mate, there's an error somehwre in the app"})
            }
        );
        return(result)
    }

    analresults = natund(naturalLanguageUnderstanding)
    console.log(analresults)
    return(analresults)
}

main({analtexts: "This is a new boy a new new boy"})