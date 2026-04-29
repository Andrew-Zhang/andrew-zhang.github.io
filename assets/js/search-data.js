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
          description: "posts by Andrew Zhang.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "selected publications and conference papers.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "post-thought-on-ttt-e2e",
        
          title: "Thought on TTT-E2E",
        
        description: "Just read the TTT-E2E paper and had some informal thoughts.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/posts/thought-on-ttt-e2e/";
          
        },
      },{id: "post-recent-trend-in-architectures",
        
          title: "Recent Trend in Architectures",
        
        description: "A recurring recipe seems to be “more parallel computation paths, each narrower.”",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/posts/recent-trend-in-architectures/";
          
        },
      },{id: "post-published-4-papers",
        
          title: "Published 4 Papers!",
        
        description: "A quick update on four 2025 papers.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/posts/published-4-papers/";
          
        },
      },{id: "post-november-amp-december-2025-reading-list",
        
          title: "November &amp; December 2025 Reading List",
        
        description: "This November and December, I was interested on MoE efficiency, speculative decoding, and efficient attention methods.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/posts/november-december-2025-reading-list/";
          
        },
      },{id: "post-discrete-diffusion-for-text-infilling",
        
          title: "Discrete Diffusion for Text Infilling",
        
        description: "Project page and paper for flexible-length text infilling with discrete diffusion models.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/posts/discrete-diffusion-for-text-infilling/";
          
        },
      },{id: "post-multimodal-paper-reviews",
        
          title: "Multimodal Paper Reviews",
        
        description: "Paper reviews from my graduate multimodal class.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/posts/multimodal-paper-reviews/";
          
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=kARDtYIAAAAJ", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/Andrew_Zhang0", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Andrew-Zhang", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/andrewzhang123", "_blank");
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
