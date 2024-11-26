import { OrderByPipe } from "./order-by.pipe";

describe('OrderByPipe', () => {

    const data = [{ id: 3 }, { id: 3 }, { id: 1 }, { id: 4 }, { id: 2 }, { id: 2 }];
    const ascData = [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 3 }, { id: 3 }, { id: 4 }];
    const descData = [{ id: 4 }, { id: 3 }, { id: 3 }, { id: 2 }, { id: 2 }, { id: 1 }];

    it('should create', () => {
        const pipe = new OrderByPipe();

        expect(pipe).toBeTruthy();
    });

    it('should sort objects by id asc', () => {
        const pipe = new OrderByPipe();
        const sortedData = pipe.transform(data, 'asc', 'id');

        expect(sortedData).toEqual(ascData);
    });

    it('should sort objects by id desc', () => {
        const pipe = new OrderByPipe();
        const sortedData = pipe.transform(data, 'desc', 'id');
        
        expect(sortedData).toEqual(descData);
    });
});
