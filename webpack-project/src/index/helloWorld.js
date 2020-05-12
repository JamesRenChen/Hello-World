export function helloworld(name) {
    let text = `hello webpack!`
    text += name.map(item => `hello ${item}! `)
    return text
}