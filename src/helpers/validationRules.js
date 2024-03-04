import { required, email, minLength, maxLength, alpha, numeric } from '@vuelidate/validators';
import { helpers } from '@vuelidate/validators';


export const rules = {

    name: {
        required,
        alpha: value => Boolean(value.match(/^[a-zA-Z ]*$/)),
        minLength: minLength(3),
        maxLength: maxLength(50)
    },
    username: {
        required,
        regex: value => Boolean(value.match(/^[a-zA-Z0-9_.]*$/)),
        minLength: minLength(3),
        maxLength: maxLength(50)
    },
    email: {
        required,
        email
    },
    phone: {
        required,
       // regex: value => Boolean(value.match(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)),
        minLength: minLength(10),
        
    },
    address: {
        street: { required, /*alpha*/ },
        suite: { required, /*alpha*/ },
        city: { required, /*alpha*/ },
        zipcode: {  
             required,
            // alphaNum: value => Boolean(value.match(/^[a-zA-Z0-9]*$/)),
            minLength: minLength(3),
            maxLength: maxLength(10) },
        geo: {
            lat: { 
                required, 
                latitude: value => Boolean(value.match(/^-?([0-8]?\d(\.\d+)?|90(\.\d+)?)$/)) 
              },
              lng: { 
                required, 
                longitude: value => Boolean(value.match(/^-?(1?\d{1,2}(\.\d+)?|180(\.\d+)?)$/)) 
              }
        },
    },
    website: { required,
       //  regex: value => Boolean(value.match('^(https?|ftp)://[^\s/$.?#].[^\s]*$'))
         },
    company: {
        name: { required, 
          //  regex: value => Boolean(value.match('^[a-zA-Z0-9. ]*$') )
        },
        catchPhrase: { required },
        bs: { required },
    },
};


export const messages = {
    name: {
        required: "Name is required.",
        alpha: "Name must contain only alphabetic characters.",
        minLength: "Name must be at least 3 characters long.",
        maxLength: "Name must be no more than 50 characters long."
    },
    username: {
        required: "Username is required.",
        regex: "Username must contain only a-z, A-Z, 0-9, and '.' characters.",
        minLength: "Username must be at least 3 characters long.",
        maxLength: "Username must be no more than 50 characters long."
    },
    email: {
        required: "Email is required.",
        email: "Please enter a valid email address, EX. example@email.com"
    },
    phone: {
        required: "Phone number is required.",
        regex: "Phone number is not valid.",
        minLength: "Phone number must be at least 10 digits long.",
       
    },
    address: {
        street: {
            required: "Street is required.",
            alpha: "Street must contain only alphabetic characters."
        },
        suite: {
            required: "Suite is required.",
            alpha: "Suite must contain only alphabetic characters."
        },
        city: {
            required: "City is required.",
            alpha: "City must contain only alphabetic characters."
        },
        zipcode: {
            required: "Zip code is required.",
            alphaNum: "Zip code must contain only alphabetic or numbers.",
            minLength: "Phone number must be at least 3 digits long.",
            maxLength: "Phone number must be at least 10 digits long.",
        },
        geo: {
            lat: {
                required: "Latitude is required.",
                latitude: "Latitude must be a number between -90 and 90."
            },
            lng: {
                required: "Longitude is required.",
                longitude: "Longitude must be a number between -180 and 180."
            },
        },
    },
    website: {
        required: "Website is required.",
        regex: "Please enter a valid website URL, Ex. http://www.example.com"
        
    },
    company: {
        name: {
            required: "Company name is required.",
            regex: "Company name must contain only a-z, A-Z, 0-9, and '.' characters."
        },
        catchPhrase: {
            required: "Catch phrase is required."
        },
        bs: {
            required: "Business strategy is required."
        },
    },
};

