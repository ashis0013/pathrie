# PATHRIE

A basic utility to find a url path from a set of paths. A trie based search allows you to find `string` value for a `path` key. Instal it using npm

```bash
npm i pathrie
```

Use `setDictionary` to initialize your key value pairs. For now only strings are allowed for both of them and path should be starting with a slash: `/path/to/hell`. Use `getValue` to execute your query. If not found it returns an empty string.

```typescript
setDictionary({
  '/workspace': 'workspaces-tools',
  '/app/workspaces-tools': 'workspaces-tools',
  '/insights': 'insights'
})

getValue('/insights/article/JF89spSJF_dj421')
```

You can also add a custom callback function once the search is successful.

```typescript
getValue('/path/to/find', (value: string) => {
  console.log('Hey there...')
  return value
})
```