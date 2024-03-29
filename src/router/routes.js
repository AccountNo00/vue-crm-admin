import store from "@/state/store";

export default [
  {
    path: "/",
    name: "default",
    meta: {
      authRequired: true,
    },
    component: () => import("./views/_superadmin/dashboard"),
  },
  {
    path: "/login",
    name: "login",  
    component: () => import("./views/_auth/login"),
    meta: {
      requiresVisitor: true,
      // beforeResolve(routeTo, routeFrom, next) {
      //   // If the user is already logged in
      //   if (store.getters["auth/loggedIn"]) {
      //     // Redirect to the home page instead
      //     next({ name: "default" });
      //   } else {
      //     // Continue to the login page
      //     next();
      //   }
      // },
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("./views/account/register"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "default" });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/forgot-password",
    name: "Forgot password",
    component: () => import("./views/account/forgot-password"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "default" });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("./views/account/logout"),
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          store.dispatch("auth/logOut");
        } else {
          store.dispatch("authfack/logout");
        }
        const authRequiredOnPreviousRoute = routeFrom.matched.some((route) =>
          route.push("/login")
        );
        // Navigate back to previous page, or home as a fallback
        next(
          authRequiredOnPreviousRoute ? { name: "default" } : { ...routeFrom }
        );
      },
    },
  },
  {
    path: "/404",
    name: "404",
    component: require("./views/utility/404").default,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  // {
  //   path: "*",
  //   redirect: "404",
  // },
  {
    path: "/dashboard/saas",
    name: "saas-dashboard",
    meta: { authRequired: true },
    component: () => import("./views/dashboards/saas/index"),
  },
  {
    path: "/dashboard/crypto",
    name: "crypto-dashboard",
    meta: { authRequired: true },
    component: () => import("./views/dashboards/crypto/index"),
  },
  {
    path: "/dashboard/blog",
    name: "blog-dashboard",
    meta: { authRequired: true },
    component: () => import("./views/dashboards/blog/index"),
  },
  {
    path: "/calendar",
    name: "Calendar",
    meta: { authRequired: true },
    component: () => import("./views/calendar/calendar"),
  },
  {
    path: "/chat",
    name: "chat",
    meta: { authRequired: true },
    component: () => import("./views/chat/index"),
  },
  {
    path: "/apps/file-manager",
    name: "file-manager",
    meta: { authRequired: true },
    component: () => import("./views/file-manager/index"),
  },
  {
    path: "/ecommerce/products",
    name: "Products",
    meta: { authRequired: true },
    component: () => import("./views/ecommerce/products"),
  },
  {
    path: "/ecommerce/product-detail/:id",
    name: "Product Detail",
    meta: { authRequired: true },
    component: () => import("./views/ecommerce/product-detail"),
  },
  {
    path: "/ecommerce/orders",
    name: "Orders",
    meta: { authRequired: true },
    component: () => import("./views/ecommerce/orders"),
  },
  {
    path: "/ecommerce/customers",
    name: "Customers",
    meta: { authRequired: true },
    component: () => import("./views/ecommerce/customers"),
  },
  {
    path: "/ecommerce/cart",
    name: "Cart",
    meta: { authRequired: true },
    component: () => import("./views/ecommerce/cart"),
  },
  {
    path: "/ecommerce/checkout",
    name: "Checkout",
    meta: { authRequired: true },
    component: () => import("./views/ecommerce/checkout"),
  },
  {
    path: "/ecommerce/shops",
    name: "Shops",
    meta: { authRequired: true },
    component: () => import("./views/ecommerce/shops"),
  },
  {
    path: "/ecommerce/add-product",
    name: "Add Product",
    meta: { authRequired: true },
    component: () => import("./views/ecommerce/add-product"),
  },
  {
    path: "/blog/list",
    name: "blog-list",
    meta: { authRequired: true },
    component: () => import("./views/blog/list"),
  },
  {
    path: "/blog/grid",
    name: "blog-grid",
    meta: { authRequired: true },
    component: () => import("./views/blog/grid"),
  },
  {
    path: "/blog/detail",
    name: "blog-detail",
    meta: { authRequired: true },
    component: () => import("./views/blog/detail"),
  },
  {
    path: "/crypto/wallet",
    name: "Wallet",
    meta: { authRequired: true },
    component: () => import("./views/crypto/wallet/index"),
  },
  {
    path: "/crypto/buy-sell",
    name: "Buy/sell",
    meta: { authRequired: true },
    component: () => import("./views/crypto/buysell/index"),
  },
  {
    path: "/crypto/exchange",
    name: "Exchange",
    meta: { authRequired: true },
    component: () => import("./views/crypto/exchange/index"),
  },
  {
    path: "/crypto/lending",
    name: "Lending",
    meta: { authRequired: true },
    component: () => import("./views/crypto/lending/index"),
  },
  {
    path: "/crypto/orders",
    name: "crypto-orders",
    meta: { authRequired: true },
    component: () => import("./views/crypto/orders/index"),
  },
  {
    path: "/crypto/kyc-application",
    name: "kyc-application",
    meta: { authRequired: true },
    component: () => import("./views/crypto/kycapplication/index"),
  },
  {
    path: "/crypto/ico-landing",
    name: "Ico-landing",
    meta: { authRequired: true },
    component: () => import("./views/crypto/ico-landing"),
  },
  {
    path: "/invoices/detail",
    name: "Invoice Detail",
    meta: { authRequired: true },
    component: () => import("./views/invoices/detail"),
  },
  {
    path: "/invoices/list",
    name: "Invoice List",
    meta: { authRequired: true },
    component: () => import("./views/invoices/list"),
  },
  {
    path: "/ui/alerts",
    name: "Alerts",
    meta: {
      authRequired: true,
    },
    component: () => import("./views/ui/alerts"),
  },
  {
    path: "/ui/buttons",
    name: "Buttons",
    meta: {
      authRequired: true,
    },
    component: () => import("./views/ui/buttons"),
  },
  {
    path: "/ui/cards",
    name: "Cards",
    meta: { authRequired: true },
    component: () => import("./views/ui/cards"),
  },
  {
    path: "/ui/carousel",
    name: "Carousel",
    meta: { authRequired: true },
    component: () => import("./views/ui/carousel"),
  },
  {
    path: "/ui/dropdowns",
    name: "Dropdowns",
    meta: { authRequired: true },
    component: () => import("./views/ui/dropdowns"),
  },
  {
    path: "/ui/grid",
    name: "Grid",
    meta: { authRequired: true },
    component: () => import("./views/ui/grid"),
  },
  {
    path: "/ui/images",
    name: "Images",
    meta: { authRequired: true },
    component: () => import("./views/ui/images"),
  },
  {
    path: "/ui/modals",
    name: "Modals",
    meta: { authRequired: true },
    component: () => import("./views/ui/modals"),
  },
  {
    path: "/ui/offcanvas",
    name: "offcanvas",
    meta: { authRequired: true },
    component: () => import("./views/ui/offcanvas"),
  },
  {
    path: "/ui/rangeslider",
    name: "Rangeslider",
    meta: { authRequired: true },
    component: () => import("./views/ui/rangeslider"),
  },
  {
    path: "/ui/progressbars",
    name: "Progressbars",
    meta: { authRequired: true },
    component: () => import("./views/ui/progressbars"),
  },
  {
    path: "/ui/placeholder",
    name: "Placeholder",
    meta: { authRequired: true },
    component: () => import("./views/ui/placeholder"),
  },
  {
    path: "/ui/sweet-alert",
    name: "Sweet-alert",
    meta: { authRequired: true },
    component: () => import("./views/ui/sweet-alert"),
  },
  {
    path: "/ui/tabs-accordions",
    name: "Tabs-accordions",
    meta: { authRequired: true },
    component: () => import("./views/ui/tabs-accordions"),
  },
  {
    path: "/ui/typography",
    name: "Typography",
    meta: { authRequired: true },
    component: () => import("./views/ui/typography"),
  },
  {
    path: "/ui/video",
    name: "Video",
    meta: { authRequired: true },
    component: () => import("./views/ui/video"),
  },
  {
    path: "/ui/general",
    name: "General",
    meta: { authRequired: true },
    component: () => import("./views/ui/general"),
  },
  {
    path: "/ui/colors",
    name: "Colors",
    meta: { authRequired: true },
    component: () => import("./views/ui/colors"),
  },
  {
    path: "/ui/lightbox",
    name: "Lightbox",
    meta: { authRequired: true },
    component: () => import("./views/ui/lightbox"),
  },
  {
    path: "/ui/image-cropper",
    name: "Image Cropper",
    meta: { authRequired: true },
    component: () => import("./views/ui/cropper"),
  },
  {
    path: "/projects/grid",
    name: "Projects Grid",
    meta: { authRequired: true },
    component: () => import("./views/projects/projects-grid"),
  },
  {
    path: "/projects/list",
    name: "Projects List",
    meta: { authRequired: true },
    component: () => import("./views/projects/projects-list"),
  },
  {
    path: "/projects/overview",
    name: "Project Overview",
    meta: { authRequired: true },
    component: () => import("./views/projects/overview"),
  },
  {
    path: "/projects/create",
    name: "Create New",
    meta: { authRequired: true },
    component: () => import("./views/projects/create"),
  },
  {
    path: "/contacts/grid",
    name: "User Grid",
    meta: { authRequired: true },
    component: () => import("./views/contacts/contacts-grid"),
  },
  {
    path: "/contacts/list",
    name: "User List",
    meta: { authRequired: true },
    component: () => import("./views/contacts/contacts-list"),
  },
  {
    path: "/contacts/profile",
    name: "Profile",
    meta: { authRequired: true },
    component: () => import("./views/contacts/contacts-profile"),
  },
  {
    path: "/charts/apex",
    name: "Apex chart",
    meta: { authRequired: true },
    component: () => import("./views/charts/apex"),
  },
  {
    path: "/charts/chartjs",
    name: "Chartjs chart",
    meta: { authRequired: true },
    component: () => import("./views/charts/chartjs/index"),
  },
  {
    path: "/charts/chartist",
    name: "Chartist chart",
    meta: { authRequired: true },
    component: () => import("./views/charts/chartist"),
  },
  {
    path: "/charts/echart",
    name: "Echart chart",
    meta: { authRequired: true },
    component: () => import("./views/charts/echart/index"),
  },
  {
    path: "/icons/boxicons",
    name: "Boxicons Icon",
    meta: { authRequired: true },
    component: () => import("./views/icons/boxicons"),
  },
  {
    path: "/icons/materialdesign",
    name: "Materialdesign Icon",
    meta: { authRequired: true },
    component: () => import("./views/icons/materialdesign"),
  },
  {
    path: "/icons/dripicons",
    name: "Dripicons Icon",
    meta: { authRequired: true },
    component: () => import("./views/icons/dripicons"),
  },
  {
    path: "/icons/fontawesome",
    name: "Fontawesome Icon",
    meta: { authRequired: true },
    component: () => import("./views/icons/fontawesome"),
  },
  {
    path: "/maps/google",
    name: "Google Maps",
    meta: { authRequired: true },
    component: () => import("./views/maps/google"),
  },
  {
    path: "/maps/leaflet",
    name: "Leaflet Maps",
    meta: { authRequired: true },
    component: () => import("./views/maps/leaflet/index"),
  },
  {
    path: "/tables/basic",
    name: "Basic Tables",
    meta: { authRequired: true },
    component: () => import("./views/tables/basictable"),
  },
  {
    path: "/form/advanced",
    name: "Form Advanced",
    meta: { authRequired: true },
    component: () => import("./views/forms/advanced"),
  },
  {
    path: "/form/elements",
    name: "Form Elements",
    meta: { authRequired: true },
    component: () => import("./views/forms/elements"),
  },
  {
    path: "/form/layouts",
    name: "Form Layouts",
    meta: { authRequired: true },
    component: () => import("./views/forms/layouts"),
  },
  {
    path: "/form/editor",
    name: "Form Editors",
    meta: { authRequired: true },
    component: () => import("./views/forms/editors"),
  },
  {
    path: "/form/uploads",
    name: "File Uploads",
    meta: { authRequired: true },
    component: () => import("./views/forms/uploads"),
  },
  {
    path: "/form/validation",
    name: "Form Validation",
    meta: { authRequired: true },
    component: () => import("./views/forms/validation"),
  },
  {
    path: "/form/wizard",
    name: "Form Wizard",
    meta: { authRequired: true },
    component: () => import("./views/forms/wizard"),
  },
  {
    path: "/form/repeater",
    name: "Form Repeater",
    meta: { authRequired: true },
    component: () => import("./views/forms/repeater"),
  },
  {
    path: "/form/mask",
    name: "Form Mask",
    meta: { authRequired: true },
    component: () => import("./views/forms/mask"),
  },
  {
    path: "/pages/starter",
    name: "Starter",
    meta: { authRequired: true },
    component: () => import("./views/utility/starter"),
  },
  {
    path: "/pages/maintenance",
    name: "Maintenance",
    meta: { authRequired: true },
    component: () => import("./views/utility/maintenance"),
  },
  {
    path: "/pages/coming-soon",
    name: "coming-soon",
    meta: { authRequired: true },
    component: () => import("./views/utility/coming-soon"),
  },
  {
    path: "/pages/timeline",
    name: "Timeline",
    meta: { authRequired: true },
    component: () => import("./views/utility/timeline"),
  },
  {
    path: "/pages/faqs",
    name: "FAQs",
    meta: { authRequired: true },
    component: () => import("./views/utility/faqs"),
  },
  {
    path: "/pages/pricing",
    name: "Pricing",
    meta: { authRequired: true },
    component: () => import("./views/utility/pricing"),
  },
  {
    path: "/pages/404",
    name: "Error-404",
    meta: { authRequired: true },
    component: () => import("./views/utility/404"),
  },
  {
    path: "/pages/500",
    name: "Error-500",
    meta: { authRequired: true },
    component: () => import("./views/utility/500"),
  },
  {
    path: "/email/inbox",
    name: "Inbox",
    meta: { authRequired: true },
    component: () => import("./views/email/inbox"),
  },
  {
    path: "/email/reademail/:id",
    name: "Read Email",
    meta: { authRequired: true },
    component: () => import("./views/email/reademail"),
  },
  {
    path: "/email/templates/basic",
    name: "Email template basic",
    meta: { authRequired: true },
    component: () => import("./views/email/templates/basic"),
  },
  {
    path: "/email/templates/billing",
    name: "Email template billing",
    meta: { authRequired: true },
    component: () => import("./views/email/templates/billing"),
  },
  {
    path: "/email/templates/alert",
    name: "Email template alert",
    meta: { authRequired: true },
    component: () => import("./views/email/templates/alert"),
  },
  {
    path: "/tasks/list",
    name: "Task list",
    meta: { authRequired: true },
    component: () => import("./views/tasks/task-list"),
  },
  {
    path: "/tasks/kanban",
    name: "Kanbanboard",
    meta: { authRequired: true },
    component: () => import("./views/tasks/kanbanboard"),
  },
  {
    path: "/tasks/create",
    name: "Create Task",
    meta: { authRequired: true },
    component: () => import("./views/tasks/task-create"),
  },
  {
    path: "/auth/login-1",
    name: "Login sample",
    meta: { authRequired: true },
    component: () => import("./views/sample-pages/login-sample"),
  },
  {
    path: "/auth/login-2",
    name: "Login-2-sample",
    meta: { authRequired: true },
    component: () => import("./views/sample-pages/login-2"),
  },
  {
    path: "/auth/register-1",
    name: "Register sample",
    meta: { authRequired: true },
    component: () => import("./views/sample-pages/register-sample"),
  },
  {
    path: "/auth/register-2",
    name: "Register-2",
    meta: { authRequired: true },
    component: () => import("./views/sample-pages/register-2"),
  },
  {
    path: "/auth/recoverpwd",
    name: "Recover pwd",
    meta: { authRequired: true },
    component: () => import("./views/sample-pages/recoverpw-sample"),
  },
  {
    path: "/auth/recoverpwd-2",
    name: "Recover pwd-2",
    meta: { authRequired: true },
    component: () => import("./views/sample-pages/recoverpwd-2"),
  },
  {
    path: "/auth/lock-screen",
    name: "Lock screen",
    meta: { authRequired: true },
    component: () => import("./views/sample-pages/lockscreen"),
  },
  {
    path: "/auth/lock-screen-2",
    name: "Lock screen-2",
    meta: { authRequired: true },
    component: () => import("./views/sample-pages/lockscreen-2"),
  },
  {
    path: "/auth/confirm-mail",
    name: "confirm-mail",
    meta: { authRequired: true },
    component: () => import("./views/sample-pages/confirm-mail"),
  },
  {
    path: "/auth/confirm-mail-2",
    name: "confirm-mail-2",
    meta: { authRequired: true },
    component: () => import("./views/sample-pages/confirm-mail-2"),
  },
  {
    path: "/auth/email-verification",
    name: "email-verification",
    meta: { authRequired: true },
    component: () => import("./views/sample-pages/email-verification"),
  },
  {
    path: "/auth/email-verification-2",
    name: "email-verification-2",
    meta: { authRequired: true },
    component: () => import("./views/sample-pages/email-verification-2"),
  },
  {
    path: "/auth/two-step-verification",
    name: "two-step-verification",
    meta: { authRequired: true },
    component: () => import("./views/sample-pages/two-step-verification"),
  },
  {
    path: "/auth/two-step-verification-2",
    name: "two-step-verification-2",
    meta: { authRequired: true },
    component: () => import("./views/sample-pages/two-step-verification-2"),
  },
  // crm
  {
    path: "/account-creation",
    name: "account-creation",
    meta: { authRequired: true },
    component: () => import("./views/_superadmin/account-creation"),
  },
  {
    path: "/account-history",
    name: "account-history",
    meta: { authRequired: true },
    component: () => import("./views/_superadmin/account-history"),
  },
  {
    path: "/user-activity-logs",
    name: "user-activity-logs",
    meta: { authRequired: true },
    component: () => import("./views/_superadmin/user-activity-logs"),
  },
  {
    path: "/ticket-tracker",
    name: "ticket-tracker",
    meta: { authRequired: true },
    component: () => import("./views/_superadmin/ticket-tracker"),
  },
  {
    path: "/department-3rdparty",
    name: "department-3rdparty",
    meta: { authRequired: true },
    component: () => import("./views/_superadmin/department-3rdparty"),
  },
  {
    path: "/all-reports",
    name: "all-reports",
    meta: { authRequired: true },
    component: () => import("./views/_superadmin/all-reports"),
  },
  {
    path: "/application-tracker",
    name: "application-tracker",
    meta: { authRequired: true },
    component: () => import("./views/_superadmin/application-trackers"),
  },
  {
    path: "/finance-dashboard",
    name: "finance-dashboard",
    meta: { authRequired: true },
    component: () => import("./views/_finance/dashboard"),
  },
  {
    path: "/finance-report",
    name: "finance-report",
    meta: { authRequired: true },
    component: () => import("./views/_finance/report"),
  },
  {
    path: "/sales-coor-dashboard",
    name: "sales-coor-dashboard",
    meta: { authRequired: true },
    component: () => import("./views/_sales-coor/dashboard"),
  },
  {
    path: "/new-application",
    name: "new-application",
    meta: { authRequired: true },
    component: () => import("./views/_sales-coor/new-application"),
  },
  {
    path: "/ocbs-list",
    name: "ocbs-list",
    meta: { authRequired: true },
    component: () => import("./views/_sales-coor/ocbs-list"),
  },
  {
    path: "/ocbs-list-view/:id",
    name: "ocbs-list-view",
    meta: { authRequired: true },
    component: () => import("./views/_sales-coor/ocbs-list-view"),
  },
  {
    path: "/arena-list",
    name: "arena-list",
    meta: { authRequired: true },
    component: () => import("./views/_sales-coor/arena-list"),
  },
  {
    path: "/arena-list-view/:id",
    name: "arena-list-view",
    meta: { authRequired: true },
    component: () => import("./views/_sales-coor/arena-list-view"),
  },
  {
    path: "/cband/dashboard",
    name: "cband-dashboard",
    meta: { authRequired: true },
    component: () => import("./views/_cband/dashboard"),
  },
  {
    path: "/cband/report",
    name: "cband-report",
    meta: { authRequired: true },
    component: () => import("./views/_cband/report"),
  },
  {
    path: "/cband/price-list",
    name: "cband-price-list",
    meta: { authRequired: true },
    component: () => import("./views/_cband/price-list"),
  },
  {
    path: "/pc-supplier/dashboard",
    name: "pc-supplier-dashboard",
    meta: { authRequired: true },
    component: () => import("./views/_pc-supplier/dashboard"),
  },
  {
    path: "/pc-supplier/report",
    name: "pc-supplier-report",
    meta: { authRequired: true },
    component: () => import("./views/_pc-supplier/report"),
  },
  {
    path: "/pc-supplier/price-list",
    name: "pc-supplier-price-list",
    meta: { authRequired: true },
    component: () => import("./views/_pc-supplier/price-list"),
  },
  {
    path: "/account-creation/report",
    name: "account-creation-report",
    meta: { authRequired: true },
    component: () => import("./views/_account-creation/report"),
  },
  {
    path: "/account-creation/dashboard",
    name: "account-creation-dashboard",
    meta: { authRequired: true },
    component: () => import("./views/_account-creation/dashboard"),
  },
  {
    path: "/trainor/dashboard",
    name: "trainor-dashboard",
    meta: { authRequired: true },
    component: () => import("./views/_trainor/dashboard"),
  },
  {
    path: "/trainor/report",
    name: "trainor-report",
    meta: { authRequired: true },
    component: () => import("./views/_trainor/report"),
  },
  {
    path: "/trainor/trainer-list",
    name: "trainor-trainer-list",
    meta: { authRequired: true },
    component: () => import("./views/_trainor/trainer-list"),
  },
  
  {
    path: "/sim/dashboard",
    name: "sim-dashboard",
    meta: { authRequired: true },
    component: () => import("./views/_sim/dashboard"),
  },
  {
    path: "/sim/report",
    name: "sim-report",
    meta: { authRequired: true },
    component: () => import("./views/_sim/report"),
  },
  {
    path: "/sim/price-list",
    name: "sim-price-list",
    meta: { authRequired: true },
    component: () => import("./views/_sim/price-list"),
  },
  {
    path: "/inventory/dashboard",
    name: "inventory-dashboard",
    meta: { authRequired: true },
    component: () => import("./views/_inventory/dashboard"),
  },
  {
    path: "/inventory/cband-installer",
    name: "inventory-cband-installer",
    meta: { authRequired: true },
    component: () => import("./views/_inventory/cband-installer"),
  },
  {
    path: "/inventory/pc-supplier",
    name: "inventory-pc-supplier",
    meta: { authRequired: true },
    component: () => import("./views/_inventory/pc-supplier"),
  },
  {
    path: "/inventory/price-list",
    name: "inventory-price-list",
    meta: { authRequired: true },
    component: () => import("./views/_inventory/price-list"),
  },
  {
    path: "/inventory/inventory-pc-supplier",
    name: "inventory-inventory-pc-supplier",
    meta: { authRequired: true },
    component: () => import("./views/_inventory/inventory-pc-supplier"),
  },
  {
    path: "/inventory/inventory-video-provider",
    name: "inventory-inventory-video-provider",
    meta: { authRequired: true },
    component: () => import("./views/_inventory/inventory-video-provider"),
  },
  {
    path: "/help-desk/new-activated",
    name: "help-desk-new-activated",
    meta: { authRequired: true },
    component: () => import("./views/_help-desk/new-activated"),
  },
  {
    path: "/help-desk/ocbs-sales",
    name: "help-desk-ocbs-sales",
    meta: { authRequired: true },
    component: () => import("./views/_help-desk/ocbs-sales"),
  },
  {
    path: "/help-desk/arena-sales",
    name: "help-desk-arena-sales",
    meta: { authRequired: true },
    component: () => import("./views/_help-desk/arena-sales"),
  },
  {
    path: "/help-desk/arena-ocbs-status",
    name: "help-desk-arena-ocbs-status",
    meta: { authRequired: true },
    component: () => import("./views/_help-desk/arena-ocbs-status"),
  },
  {
    path: "/sales-manager/dashboard",
    name: "sales-manager-dashboard",
    meta: { authRequired: true },
    component: () => import("./views/_sales-manager/dashboard"),
  },
  {
    path: "/sales-manager/arena-list",
    name: "sales-manager-arena-list",
    meta: { authRequired: true },
    component: () => import("./views/_sales-manager/arena-list"),
  },
  {
    path: "/sales-manager/ocbs-list",
    name: "sales-manager-ocbs-list",
    meta: { authRequired: true },
    component: () => import("./views/_sales-manager/ocbs-list"),
  },
  {
    path: "/sales-manager/ocbs-list-view/:id",
    name: "sales-manager-ocbs-list-view",
    meta: { authRequired: true },
    component: () => import("./views/_sales-manager/ocbs-list-view"),
  },
  {
    path: "/sales-manager/new-application",
    name: "sales-manager-new-application",
    meta: { authRequired: true },
    component: () => import("./views/_sales-manager/new-application"),
  },
  {
    path: "/sales-manager/approval-queue",
    name: "sales-manager-approval-queue",
    meta: { authRequired: true },
    component: () => import("./views/_sales-manager/approval-queue"),
  },
  {
    path: "/sales-manager/delete-double",
    name: "sales-manager-delete-double",
    meta: { authRequired: true },
    component: () => import("./views/_sales-manager/delete-double"),
  },
  {
    path: "/sales-manager/maps",
    name: "sales-manager-maps",
    meta: { authRequired: true },
    component: () => import("./views/_sales-manager/maps"),
  },
];