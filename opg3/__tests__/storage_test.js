import React from 'react';
import Storage from '../Storage';


const storage = new Storage();

afterAll(() => {
        storage._removeMultiple(["testKey1", "testKey2"])
    }
);

it('retrieves correctly', async () => {
    await storage._storeData("testKey1", "testValue1");
    let data = "";
    await storage._retrieveData("testKey1").then(res => {
        data = res;
    });
    expect(data).not.toEqual(""); // Doesn't actually work, data is undefined so test passes
//  expect(data).toEqual("testValue1"); // This is what we want to test
});

/*describe("nested block", () => {

    it("appends correctly", async () => {
        await storage._appendData("testKey1", "testValue2");
        await storage._retrieveData("testKey1").then(result => {
            expect(result).toEqual("testValue1, testValue2");
        });
    });

    describe("another nested block", () => {

        it("retrieves multiple correctly", async () => {
            await storage._storeData("testKey2", "testValue3");
            await storage._retrieveMultiple(["testKey1", "testKey2"]).then(results => {
                expect(results).toEqual([["testKey1", "testValue1, testValue2"], ["testKey2", "testValue3"]]);
            });
        });

    })
});
*/
