import request from "supertest"

describe("POST /login", () => {
    describe("given the correct data posted to the server", () => {
        test("should respond with 200 status code", async () => {
            const userData = {
                email: "123@gmail.com",
                password: "123"
            };

            const response = await request(app).post("/login").send(userData);
            expect(response.statusCode).toEqual(200);
        })

        test("should have json as the content-type in the response", async () => {
            const userData = {
                email: "123@gmail.com",
                password: "123"
            };

            const response = await request(app).post("/login").send(userData);
            expect(response.header["content-type"]).toEqual(expect.stringContaining("json"));
        })
    })

    describe("given the wrong data posted to the server", () => {
        test("should respond with 400 status code", async () => {
            const userData = {
                email: "123@gmail.com",
                password: "321"
            };

            const response = await request(app).post("/login").send(userData);
            expect(response.statusCode).toEqual(400);
        });

        test("should have json as the content-type in the response", async () => {
            const response = await request(app).post("/login").send(userData);
            expect(response.header["content-type"]).toEqual(expect.stringContaining("json"));
        })

        test("should have a string that explain the error", async () => {
            const userData = {
                email: "123@gmail.com",
                password: "321"
            }

            //pass {error: "some error"}

            const response = await request(app).post("/login").send(userData);
            expect(typeof response.body.error).toBe("string");
        })
    })
})