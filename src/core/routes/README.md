# Index

In the **WEB_SERVER_ENDPOINTS** constant, put all your routes:

```javascript
const WEB_SERVER_ENDPOINTS: IRouteDeclaration[] = [
  {
    prefix: "/api",
    nestedRoutes: [
      // BooksRouter,
      // SectionsRouter,
      // ExampleRouter,
      // OtherRouter
    ],
  },
  {
    prefix: "/v2",
    nestedRoutes: [
      // NewRouter,
      // AnotherNewRouter
    ]
  },
  ...
];
```

# RoutingManager Class

This is the class used for load all the server routes than you may need in your API REST.