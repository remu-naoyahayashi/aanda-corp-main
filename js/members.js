(f => {
    if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", f)
    } else {
        f()
    }
})(() => {

    const
        parent_selector = "ul.members__lists",
        selector = `${parent_selector} li.members-list`,
        tag = document.querySelector(selector).outerHTML,
        parent_elm = document.querySelector(parent_selector),
        add_item = html => parent_elm.insertAdjacentHTML("beforeend", html),
        do_replace = async (path) => {
            const res = await fetch("member.json"),
                data = res.ok ? await res.json() : null;
            if (data) {
                for (const item of data) {
                    console.log(item);
                    
                    let w = tag
                    for (const [k, v] of Object.entries(item)) {
                        const ptn_str = `{{${k}}}`
                        w = w.replaceAll(ptn_str, v)
                    }
                    console.log(w);
                    
                    add_item(w)
                }
            }
        };

    document.querySelectorAll("ul.members__lists li.members-list").forEach(el => el.remove())
    do_replace()


})