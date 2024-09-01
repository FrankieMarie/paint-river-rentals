const header = document.getElementById('header');
const navItems = document.querySelectorAll('nav li');
const anchorIcons = document.querySelectorAll('.anchor');

// adds background blur to header when scrolled
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  if (header != null && scrollPosition >= 100) {
    header.classList.add('blur-background');
  }

  if (header != null && scrollPosition === 0) {
    header?.classList.remove('blur-background');
  }
});

// add underline to active nav item
navItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    // @ts-ignore
    const hash = e?.target?.attributes.href.value;

    // reset all other nav items to no underline
    navItems.forEach((n) => {
      n.classList.remove('after:scale-x-100');
      n.classList.add('after:scale-x-0');
    });

    // set current to underline
    item.classList.add('after:scale-x-100');
    item.classList.remove('after:scale-x-0');

    // highlight corresponding anchor icon
    anchorIcons.forEach((icon) => {
      const iconHref = icon.getAttribute('href');

      // reset all other anchor icons to opacity-50
      anchorIcons.forEach((i) => {
        const attrHref = i.getAttribute('href');
        if (hash !== attrHref) {
          i.classList.add('opacity-50');
          i.classList.remove('opacity-100');
        }
      });

      // set current to opacity-100
      if (hash === iconHref) {
        icon.classList.add('opacity-100');
        icon.classList.remove('opacity-50');
      }
    });
  });
});

// highlight anchor icon that matches current href
anchorIcons.forEach((icon) => {
  icon.addEventListener('click', (e) => {
    // @ts-ignore
    const hash = e.target?.offsetParent.firstElementChild.getAttribute('href');

    // reset all other anchor icons to opacity-50
    anchorIcons.forEach((a) => {
      a.classList.add('opacity-50');
      a.classList.remove('opacity-100');
    });

    // set current to opacity-100
    icon.classList.add('opacity-100');
    icon.classList.remove('opacity-50');

    // underline corresponding nav link
    navItems.forEach((item) => {
      const navItemHref = item.children[0].getAttribute('href');

      // reset all other nav items to no underline
      navItems.forEach((n) => {
        const attrHref = n.children[0].getAttribute('href');
        if (hash !== attrHref) {
          n.classList.add('after:scale-x-0');
          n.classList.remove('after:scale-x-100');
        }
      });

      // set current to underline
      if (hash === navItemHref) {
        item.classList.add('after:scale-x-100');
        item.classList.remove('after:scale-x-0');
      }
    });
  });
});
