export const TransferInstructions =[
    {
        content: 'Sign in to your bank account'
    },
    {
        content: 'Initiate the process for transferring money to the United States'
    },
    {
        content: 'Enter the following wiring information for Drivewealth and its bank:',
        table: true,
        title_one:'Recipient Details',
        description_one:[
            'Recipient Name: DriveWealth, LLC',
            'Relationship: Parent Company',
            'Recipient Account Number: 9870304186',
            'Recipient Address: 97 Main Street, Second Floor,Chatham, NJ 07928'
        ],
        title_two:'Recipient Bank Details',
        description_two: [
            'Bank Name: M&T Bank',
            'ABA / Fedwire Routing Number: 022000046',
            'SWIFT Code: MANTUS33',
            'Bank Address: One M & T Plaza, 345 Main Street, Buffalo, NY 14203'
        ]
    },
    {   title:'details',
        content: 'If there is a section to input further information (eg reference or message to recipient), please input your Name and Globalise Account Number'
    },
    {
        content:'Complete the transaction.'
    },
    {
        content:'Send an email to customers@globalise.co with the following information so we can trace your transfer:',
        description: ['Your name (as on your Globalise account):',"Source: Your Bank's name","Amount transferred (in USD):"]
    },
    {
        content:'You will receive a confirmation email once the money is received in your Globalise account. '
    },

]