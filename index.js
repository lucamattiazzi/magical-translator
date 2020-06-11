function spliceWord(word, idx, length, newWord) {
  const prefix = word.slice(0, idx)
  const suffix = word.slice(idx + length)
  return `${prefix}${newWord}${suffix}`
}

function toSpanish(node) {
  let oldData = node.data
  const allMatches = oldData.matchAll(/([A-zÀ-ú]+)/g)
  let replacedWords = 0
  for (const matchedWord of allMatches) {
    const word = matchedWord[0]
    if (word.endsWith('s')) continue
    const idx = matchedWord.index + replacedWords
    if (oldData[idx + word.length] === "'") continue
    oldData = spliceWord(oldData, idx, word.length, `${word}s`)
    replacedWords++
  }
  node.data = oldData
}

function toChinese(node) {
  const oldData = node.data
  node.data = oldData.replace(/r/g, 'l').replace(/R/, 'L')
}

function recursivelyReplace(element, translator) {
  for (const child of element.childNodes) {
    child.nodeType === document.TEXT_NODE ? translator(child) : recursivelyReplace(child, translator)
  }
}

export function translateToChinese() {
  recursivelyReplace(document.body, toChinese)
}

export function translateToSpanish() {
  recursivelyReplace(document.body, toSpanish)
}