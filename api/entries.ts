import dayjs from 'dayjs';
import { watch } from 'vue';

export const getEntriesOfYears = async () => {
  try {
    console.log('call api');
    const data = await $fetch(
      'https://649958fb79fbe9bcf83f0f2f.mockapi.io/data/api/entries'
    );

    console.log(data);

    // const data = {
    //   value: [
    //     {
    //       entries: [
    //         {
    //           emotion: 1,
    //           // time: '2020-12-10 10:57',
    //           time: dayjs('2020-12-10 10:57'),
    //           title: 'Hello world',
    //           content: 'Hello world',
    //           checked: false,
    //         },
    //       ],
    //       year: 2020,
    //     },
    //     {
    //       entries: [
    //         {
    //           emotion: 1,
    //           // time: '2018-12-10 10:57',
    //           time: dayjs('2018-12-10 10:57'),
    //           title: 'First entry',
    //           content: 'This is first entry',
    //           checked: false,
    //         },
    //       ],
    //       year: 2018,
    //     },
    //   ],
    // };

    // Transform data after fetching
    return (data as any)?.map((entriesOfYear: any) => {
      return {
        ...entriesOfYear,
        entries: entriesOfYear.entries.map((entry: any) => {
          return {
            ...entry,
            checked: false,
            // Convert Dayjs object to string to avoid POJO issue
            time: dayjs(entry.time), // or use any format you need
          };
        }),
      };
    });
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to handle it outside
  }
};
