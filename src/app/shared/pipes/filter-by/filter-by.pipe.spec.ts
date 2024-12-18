import { FilterPipe } from './filter-by.pipe';

describe('FilterByPipe', () => {
  const data = [{ name: 'a' }, { name: 'aa1' }, { name: 'aaa' }, { name: 'bb' }, { name: 'aaaa' }];
  const filteredData = [{ name: 'aa1' }, { name: 'aaa' }, { name: 'aaaa' }];

  it('should create', () => {
    const pipe = new FilterPipe();

    expect(pipe).toBeTruthy();
  })

  it('should filter objects by name', () => {
    const pipe = new FilterPipe();
    const result = pipe.transform(data, 'aa', 'name');

    expect(result).toEqual(filteredData);
  })

  it('should return empty array when input is null', () => {
    const nullData = getNullData();
    const pipe = new FilterPipe();
    const result = pipe.transform(nullData, 'aa', 'name');

    expect(result).toEqual([]);
  })

  function getNullData(): { name: string }[] | null {
    return null;
  }
});
