// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-anyone-dread-the-selfless-i",
        
          title: "Anyone Dread: The Selfless I",
        
        description: "The randomness of being born",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/anyone-dread/";
          
        },
      },{id: "post-wu-wei-conscious-and-the-unconscious",
        
          title: "Wu Wei: Conscious and the Unconscious",
        
        description: "The art of doing nothing",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/wu-wei/";
          
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
