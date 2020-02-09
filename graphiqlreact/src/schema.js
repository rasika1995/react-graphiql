const graphql = require('graphql');
const lodash = require('lodash');
const { GraphQLObjectType, GraphQLString,GraphQLSchema, GraphQLID, GraphQLInt,GraphQLList} = graphql;


//dummy data

var books = [
    {name:'RR',genre:'fan1',id:'1',authorId:'1'},
    {name:'SS',genre:'fan2',id:'2',authorId:'2'},
    {name:'TT',genre:'fan3',id:'3',authorId:'3'},
    {name:'UU',genre:'fan1',id:'4',authorId:'2'},
    {name:'VV',genre:'fan2',id:'5',authorId:'2'},
    {name:'WW',genre:'fan3',id:'6',authorId:'3'},
];

var authors = [
    {name:'AA',age:24,id:'1'},
     {name:'BB',age:34,id:'2'},
     {name:'CC',age:44,id:'3'},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:() => ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                return lodash.find(authors,{id:parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:() => ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return lodash.filter(books,{authorId:parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
               // args.id
               //console.log(typeof(args.id));
                //code to get from db / other source
                return lodash.find(books,{id:args.id});
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return lodash.find(authors,{id:args.id});
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return books;
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors;
            }
        }
    }
});



module.exports = new GraphQLSchema({
    query:RootQuery
})