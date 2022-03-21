# data2file
**Data2file** is a library to humanize output data. It's allows write some raw table data into a formatted buffer to finally write it in a file or use it to make a http response.

## Allowed output formats

- CSV
- JSON
- EXCEL

## Configuration

| Key name | Description | Type |
| ----------- | ----------- | ---- |
| prefixName | Prefix name to identify the output collection | String |
| columns | It's a configuration to formatted each row data in a single primitive data. And it's the liable to the header title | Object |
| i18nConfig | It's a configuration for [i18n](https://github.com/mashpie/i18n-node) library to translate mainly the headers of the collection. And can be used to change the row data. | Object |

### Column item config

| Key name | Description | Type |
| ----------- | ----------- | ---- |
| dataIndex | Path to extract the main value for each row | String \\| Array |
| title | It is the key to trabslate the header to each columns | String |
| formatter | Optional argument to customize the output row value. <br> Argument types: <br> - **value** : Related to dataIndex. <br> - **values**: Full row item. <br> - **lang**: Current language <br> - **i18n**: I18n Instance <br> - **t**: Function to translate. It is the result of i18n config. | ? Function |


#### Example config

```ts
const columns = [
    ...
  {
    dataIndex: 'name',
    title: 'user.name',
  },
  {
    dataIndex: 'firstName',
    title: 'user.fullName',
    formatter: ({value, values}) => {
        return value && values?.lastName ? `${value} ${values?.lastName}`: value;
    }
  },
  {
    dataIndex: 'status.code',
    title: 'user.status',
    formatter: ({value, t}) => {
        return value ? t(`user.status.type${value}`) : ''
    }
  },
  ...
];
```
----
<br>

## Full example:

```ts
...
import { createFileBuilder, FORMATS } from 'data2file';

export const i18nConfig = {
  locales: ['en', 'es'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
};

// return a function to generate the Buffer data
const generate = createFileBuilder({ i18nConfig, prefixName: 'Active-users', columns });

const rawData = [
    ...
    {
        name: 'bill',
        firstName: 'Bill',
        lastName: 'Clarey',
        status: {
            code: 'ACTIVE'
        }
    },
    ...
];

const result = generate(rawData, FORMATS.csv, 'es')
```