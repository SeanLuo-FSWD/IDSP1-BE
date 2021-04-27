import request from "supertest"


describe("/POST /signup", () => {
    describe("When email field is empty", () => {
        test("Should return error: Empty email field", async () => {
            const signUpData = {
                email: "",
                password: "qwF#lkejqwr"
            };

            const response = await request(app).post("/signup").send(signUpData);

            //{ error: "Email field cannot be empty." }
            expect(response.body.error).toEqual("Error: Email field cannot be empty.")
        })
    })

    describe("When password field is empty", () => {
        test("Should return error: Empty password field", async () => {
            const signUpData = {
                email: "123@gmail.com",
                password: ""
            };

            const response = await request(app).post("/signup").send(signUpData);
            //{ error: "Email field cannot be empty." }
            expect(response.body.error).toEqual("Error: Email field cannot be empty.")
        })
    })

    describe("When validation is met and register is successful", () => {
        test("Should return status code 200", async () => {
            const signUpData = {
                email: "123@gmail.com",
                password: "Ad34567#dsg"
            };

            const response = await request(app).post("/signup").send(signUpData);
            expect(response.statuscode).toEqual(200)
        })
    })
    
    describe("When validation is NOT met and register is NOT successful", () => {
        test("Should return status code 400", async () => {
            const signUpData = {
                email: "123@gmail.com",
                password: "Ad34567#dsg"
            };

            const response = await request(app).post("/signup").send(signUpData);
            expect(response.statuscode).toEqual(400)
        })
    })

})

