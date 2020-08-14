const columns = [
    {
        title: 'Account Name',
        dataIndex: 'name',
        filterMultiple: false,
        width: '30%',
        // specify the condition of filtering result
        // here is that finding the name started with `value`
      },
      {
        title: 'Account Number',
        dataIndex: 'no',
        width: '20%',
      },
      {
        title: 'Account Type',
        dataIndex: 'sval',
        width: '15%',
      },
      {
        title: 'Dependent Name',
        dataIndex: 'Csell',
        width: '15%',
      },
      {
        title: 'Current Plan',
        dataIndex: 'Gl',
        filterMultiple: false,
        width: '20%',
      },
     
    ];
   
export default columns;