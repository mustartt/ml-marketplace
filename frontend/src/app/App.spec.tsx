import App from "./App";

describe("App", () => {
    it("app is not null", () => {
        expect(App).not.toBeNull();
    });

    it("simple logic", () => {
       expect(1).toBe(1);
    });
});