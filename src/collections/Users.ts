//import { PrimaryActionEmailHtml } from '../components/emails/PrimaryActionEmail'
import { Access, CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
         verify: {
           generateEmailHTML: ({ token }) => {
          
            return `<p>hello plsd verify</p>`
        },
      },
    },
    access: {
        read: () => true,
        create: () => true,
    },

    fields: [
     {
        name: 'role',
        defaultValue: 'user',
        required: true,
        // admin: {
        //     condition: () => false
    
        // },
        type: 'select',
        options: [
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
        ],
    },
 ],
}