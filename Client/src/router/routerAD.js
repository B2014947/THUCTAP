const routerAdmin = [
    {
        path: "/",
        name: "home.page",
        component: () => import("@/layouts/home.page.vue"),
        meta: {
            title: "Home page for Admin"
        },
        children: [
            {
                path: "", // Đường dẫn trống sẽ render trang chủ
                name: "homepage",
                component: () => import("@/components/Homepage.vue"),
                meta: {
                    title: "Homepage"
                }
            },
            {
                path: "document-list",
                name: "document.list",
                component: () => import("@/components/DocumentList.vue"),
                meta: {
                    title: "Document List"
                }
            },
            {
                path: "add-new-document",
                name: "add-new-document",
                component: () => import("@/components/AddNewDocument.vue"),
                meta: {
                    title: "Add New Document"
                }
            },
            {
                path: "department-list",
                name: "department.list",
                component: () => import("@/components/DepartmentList.vue"),
                meta: {
                    title: "Department List"
                }
            },
            {
                path: "add-new-department",
                name: "add-new-department",
                component: () => import("@/components/AddNewDepartment.vue"),
                meta: {
                    title: "Add New Department"
                }
            },
            {
                path: "member-list",
                name: "member.list",
                component: () => import("@/components/MemberList.vue"),
                meta: {
                    title: "Member List"
                }
            },
            {
                path: "add-new-member",
                name: "add-new-member",
                component: () => import("@/components/AddNewMember.vue"),
                meta: {
                    title: "Add New Member"
                }
            },
            {
                path: "role-management",
                name: "role.management",
                component: () => import("@/components/RoleManagement.vue"),
                meta: {
                    title: "Role Management"
                }
            },
            {
                path: "add-new-role",
                name: "add-new-role",
                component: () => import("@/components/AddNewRole.vue"),
                meta: {
                    title: "Add New Role"
                }
            },
            // Thêm route cho quản lý văn bản
            {
                path: "document-out",
                name: "document.out",
                component: () => import("@/components/DocumentOut.vue"),
                meta: {
                    title: "Document Management"
                }
            },
            {
                path: "add-document",
                name: "add-document",
                component: () => import("@/components/AddDocumentOut.vue"),
                meta: {
                    title: "Add New Document"
                }
            },
            {
                path: "document-in",
                name: "document.in",
                component: () => import("@/components/DocumentIn.vue"),
                meta: {
                    title: "Document Management"
                }
            },
            {
                path: "add-document-in",
                name: "add-document-in",
                component: () => import("@/components/AddDocumentIn.vue"),
                meta: {
                    title: "Add New Document"
                }
            },
        ]
    },
    {
        path: "/login",
        name: "login.admin",
        component: () => import("@/layouts/login.page.vue"),
        meta: {
            title: "Login for Admin"
        }
    }
];

export default routerAdmin;
