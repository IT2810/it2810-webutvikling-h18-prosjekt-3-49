import React from 'react';
import MockAsyncStorage from 'mock-async-storage';
import Storage from '../components/Storage';

const mock = () => {
    const mockImpl = new MockAsyncStorage();
    jest.mock('AsyncStorage', () => mockImpl)
};

mock();

const storage = new Storage();

it('stores correctly', async () => {
    await storage._storeData('testKey1', 'testValue1');
    return storage._retrieveData("testKey1")
        .then(value => {
            expect(value).toBe('testValue1');
        })
});

it("removes correctly", async () => {
    await storage._removeMultiple(["testKey1"]);
    return storage._retrieveData("testKey1")
        .then(results => {
            expect(results).toEqual(undefined);
        })
});
