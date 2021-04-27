import request from "supertest"

const emailField = {
    email: ""
}


describe("/POST /signup", () => {
    describe("When email field is empty", () => {
        test("Should return error: Empty email field", async () => {
            const emailField = {
                email: "",
                password: "qwlkejqwr"
            };

            const response = await request(app).post("/signup").send(emailField);

            //{ error: "Email field cannot be empty." }
            expect(response.body.error).toEqual("Error: Email field cannot be empty.")
        })
    })
})

describe("/POST /signup", () => {
    describe("when password field is empty", () => {
        test("should return error, please enter password", async () => {
            const password = {
                password: ""
            })

            const response = await (await request(app).post('/signup')).setEncoding(postdata)
            expect(response.statusCode).toEqual()
        }
    }


    
})