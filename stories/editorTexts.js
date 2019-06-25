//{{{ const initialMarkdown
export const initialMarkdown = `
# H1
## H2
### H3
#### H4
##### H5
Text **bold** and *italic* should ~~not~~ work.
日本語の**太字**と*斜め*字も使え~~ない~~る。

Horizontal rule should work.

---

[Link to cindythink](http://www.cindythink.com/) should work.
[This link][Cindy] should work also

[Cindy]: http://www.cindythink.com

\`\`\`
This is code block.
\`\`\`
And this is \`inline\` code.
`.substr(1);
//}}}

//{{{ const initialHtml
export const initialHtmlFont = `
<font color="red" size="1">Color should be applied directly</font>
<font color="orange" size="2">Color should be applied directly</font>
<font color="yellow" size="3">Color should be applied directly</font>
<font color="green" size="4">Color should be applied directly</font>
<font color="cyan" size="3">Color should be applied directly</font>
<font color="blue" size="2">Color should be applied directly</font>
<font color="indigo" size="3">Color should be applied directly</font>
`.substr(1);

export const initialHtmlStyle = `
<div style="width: 100%; font-size: 1em; color: #9a3482;">Style property should also work</div>

<span style="font-size:1.2em;color:#9a4c34;">space and tag does not matter</span>
`.substr(1);
//}}}

// {{{ const initialMonoWidth
export const initialMonoWidth = `
Unicode Calendar from https://beautifuldingbats.com/calendar-generator/
\`\`\`

╔════════════════════╗
║ June ░░░░░░░░ 2019 ║
╟──┬──┬──┬──┬──┬──┬──╢
║░░│░░│░░│░░│░░│░░│01║
╟──┼──┼──┼──┼──┼──┼──╢
║02│03│04│05│06│07│08║
╟──╔══╗──┼──┼──┼──┼──╢
║09║10║11│12│13│14│15║
╟──╚══╝──┼──┼──┼──┼──╢
║16│17│18│19│20│21│22║
╟──┼──┼──┼──┼──┼──┼──╢
║23│24│25│26│27│28│29║
╟──┼──┼──┼──┼──┼──┼──╢
║30│░░│░░│░░│░░│░░│░░║
╚══╧══╧══╧══╧══╧══╧══╝

┏━━━━━━━━━━━━━━━━━━━━┓
┃ June ▒▒▒▒▒▒▒▒ 2019 ┃
┣━━┳━━┳━━┳━━┳━━┳━━┳━━┫
┃Su┃Mo┃Tu┃We┃Th┃Fr┃Sa┃
┣━━╇━━╇━━╇━━╇━━╇━━╇━━┫
┃▒▒│▒▒│▒▒│▒▒│▒▒│▒▒│01┃
┠──┼──┼──┼──┼──┼──┼──┨
┃02│03│04│05│06│07│08┃
┠──╔══╗──┼──┼──┼──┼──┨
┃09║10║11│12│13│14│15┃
┠──╚══╝──┼──┼──┼──┼──┨
┃16│17│18│19│20│21│22┃
┠──┼──┼──┼──┼──┼──┼──┨
┃23│24│25│26│27│28│29┃
┠──┼──┼──┼──┼──┼──┼──┨
┃30│▒▒│▒▒│▒▒│▒▒│▒▒│▒▒┃
┗━━┷━━┷━━┷━━┷━━┷━━┷━━┛
\`\`\`
`.substr(1);
// }}}

// {{{ const initialStamps
export const initialStamps = `
:stamp-death: -tayah
`.substr(1);
// }}}

// {{{ const initialMultiLineBreaks
export const initialMultiLineBreaks = `
1
2

3


4



5`.substr(1);
// }}}

// {{{ const initialTabs
export const initialTabs = `
<!--tabs-->
<!--tab A-->
Contents of A
<!--endtab-->
<!--tab B-->
Contents of B
<!--endtab-->
<!--endtabs-->`.substr(1);
// }}}
