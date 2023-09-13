import { IColumn } from "@coreui/angular-pro/lib/smart-table/smart-table.type";

const AuditColumns: (IColumn | string)[] = [
    {
      label: 'User ID',
      key: 'uuid',
    },
    {
      label: 'Action',
      key: 'actionType',
    },
    { label: 'Action Date', key: 'actionDate', },
    {
      key: 'show',
      label: '',
      _style: { width: '5%' },
      filter: false,
      sorter: false,
    },
  ]
export default AuditColumns;