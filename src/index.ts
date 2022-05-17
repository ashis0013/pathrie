type urlTreeNode = {
  route: string
  label: string
  onFind: ((value: string) => string)
  children: urlTreeNode[]
}

const root: urlTreeNode = {
  route: '',
  label: '',
  onFind: (val) => val,
  children: []
}

function insert(node: urlTreeNode, routePaths: string[], label: string, index: number, onFindCallback: ((value: string) => string) | null = null): void {
  if (index >= routePaths.length) return
  const childIndex = node.children.map((node) => node.route).indexOf(routePaths[index])
  if (childIndex < 0) {
    node.children.push({
      route: routePaths[index],
      label: index === routePaths.length - 1 ? label : '',
      onFind: onFindCallback ?? ((val) => val),
      children: [] as urlTreeNode[]
    })
  }
  insert(node.children[childIndex < 0 ? node.children.length - 1 : childIndex], routePaths, label, index + 1, onFindCallback)
}

function query(node: urlTreeNode, routePaths: string[], index: number): string {
  const childIndex = node.children.map((node) => node.route).indexOf(routePaths[index])
  return (index !== routePaths.length - 1 && childIndex >= 0) ? query(node.children[childIndex], routePaths, index + 1) : node.onFind(node.label)
}

export function getValue(path: string, onFindCallback: ((value: string) => string)| null = null): string {
  if (root.children?.length === 0) {
    Object.keys(appDict).forEach((key) => insert(root, key.split('/'), appDict[key], 0, onFindCallback))
  }
  return query(root, `${path}/`.split('/'), 0)
}

export function setDictionary(dict: { [key: string]: string }) {
  appDict = dict
}

let appDict: { [key: string]: string } = {}


export let sampleDict: { [key: string]: string } = {
  '/workspace': 'workspaces-tools',
  '/app/workspaces-tools': 'workspaces-tools',
  '/insights': 'insights'
}
