//

export const validateQuotation = (name, phone, email, service, msg) => {
    const fields = {
        name,
        phone,
        email,
        service,
        msg
    }

    

    // Check empty
    for(let f in fields) {
        console.log(fields[f]);
        // if(f.value == "") {
        //     f.class
        // }
    }
};



class Validator {

    //constructor
    constructor(field) {
        this.field = field;
        this.states = [];
    }

    static nonEmpty() {
        if(!field.value) {
            console.log("is empty");
        }

        return this.field;
    }

    // This validates the
    static validateQuotation() {

    }
}