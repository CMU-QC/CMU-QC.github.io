const { createApp, ref, reactive, computed, onMounted, watch } = Vue;

createApp({
  setup() {
    // Club Information
    const clubName = ref("CMU Quantum");
    const clubMotto = ref("Advancing the Future, Bit by Qubit.");
    const clubFocus = ref(
      "cultivating quantum curiosity, education, and collective progress."
    );
    const foundingYear = ref(2024);
    const clubMission = ref(
      "fostering a community of quantum enthusiasts, researchers, and developers to push the boundaries of quantum technology"
    );
    const typicalActivities = ref([
      "quantum hackathons",
      "research projects",
      "educational workshops",
      "industry speaker events",
    ]);

    // Navigation
    const currentPage = ref("home"); // 'home', 'events', etc.
    // Qiskit Banner
    const qiskitBannerVisible = ref(true); // New variable to control banner visibility
    const qiskitEventData = ref(null);

    // Events
    const upcomingEvents = ref([]);
    const pastEvents = ref([]);
    const currentEventType = ref("upcoming"); // 'upcoming' or 'previous'

    // Filtered Events (computed)
    const filteredEvents = computed(() => {
      return currentEventType.value === "upcoming"
        ? upcomingEvents.value
        : pastEvents.value;
    });

    // Load Qiskit Fall Fest page data
    const loadQiskitEvent = async () => {
      try {
        const response = await fetch("data/qiskit.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        qiskitEventData.value = data;
      } catch (error) {
        console.error("Error loading Qiskit event data:", error);
        qiskitEventData.value = null;
      }
    };

    // Load events
    // Function to load and sort events from JSON
    const loadEvents = async () => {
      try {
        const response = await fetch("data/events.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date to midnight

        const tempUpcoming = [];
        const tempPast = [];

        data.forEach((event) => {
          const eventStartDate = new Date(event.startDate);
          if (isNaN(eventStartDate.getTime())) {
            console.warn(
              `Invalid startDate format for event: ${event.name} (${event.startDate}). This event may not be sorted correctly.`
            );
            return;
          }
          eventStartDate.setHours(0, 0, 0, 0); // Normalize event start date to midnight

          if (eventStartDate >= today) {
            tempUpcoming.push(event);
          } else {
            tempPast.push(event);
          }
        });

        // Sort upcoming events from earliest startDate to latest
        tempUpcoming.sort((a, b) => {
          const dateA = new Date(a.startDate).getTime();
          const dateB = new Date(b.startDate).getTime();
          return dateA - dateB;
        });
        upcomingEvents.value = tempUpcoming;

        // Sort past events from latest startDate to earliest (most recent first)
        tempPast.sort((a, b) => {
          const dateA = new Date(a.startDate).getTime();
          const dateB = new Date(b.startDate).getTime();
          return dateB - dateA; // b - a for descending order (latest first)
        });
        pastEvents.value = tempPast;
      } catch (error) {
        console.error("Error loading events:", error);
        upcomingEvents.value = [];
        pastEvents.value = [];
      }
    };

    // Filter Projects
    const projects = ref([]);
    const currentProjectType = ref("current"); // 'current' or 'previous'

    const filteredProjects = computed(() => {
      return projects.value.filter(
        (project) => project.status === currentProjectType.value
      );
    });

    // Load projects
    const loadProjects = async () => {
      try {
        const response = await fetch("data/projects.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        projects.value = data;
      } catch (error) {
        console.error("Error loading projects:", error);
        projects.value = [];
      }
    };

    // Team Members
    const teamMembers = ref([]);

    const loadTeamMembers = async () => {
      try {
        const response = await fetch("data/team.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        teamMembers.value = data;
      } catch (error) {
        console.error("Error loading team members:", error);
        teamMembers.value = [];
      }
    };

    // Educational Resources
    const educationalResources = ref([]);

    const loadEducationalResources = async () => {
      try {
        const response = await fetch("data/educational.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        educationalResources.value = data;
      } catch (error) {
        console.error("Error loading educational resources:", error);
        educationalResources.value = [];
      }
    };

    // Contact and Links
    const contact = reactive({
      email: "qc.at.cmu@gmail.com",
      phone: "",
      socialMedia: {
        linkedin:
          "https://www.linkedin.com/company/carnegie-mellon-quantum-computing/about/",
        github: "https://github.com/CMU-QC",
        twitter: "https://twitter.com/CMU_QC",
        discord: "https://discord.gg/gNBkFnwtpj",
      },
    });

    const joinUsLink = ref(
      "https://docs.google.com/forms/d/e/1FAIpQLSfVZGCVMvJu8CRKKPmgQm3U5XDTK-WgJ_axsjY-EAhyt6zGRg/viewform?usp=dialog"
    );

    // Footer
    const currentYear = computed(() => new Date().getFullYear());

    // Load all data on mount
    onMounted(() => {
      loadEvents();
      loadProjects();
      loadTeamMembers();
      loadEducationalResources();
    });

    return {
      // Club Info
      clubName,
      clubMotto,
      clubFocus,
      foundingYear,
      clubMission,
      typicalActivities,

      // Navigation
      currentPage,
      qiskitBannerVisible,

      // Events
      currentEventType,
      filteredEvents,
      qiskitEventData,

      // Projects
      currentProjectType,
      filteredProjects,

      // Team & Education
      teamMembers,
      educationalResources,

      // Contact
      contact,
      joinUsLink,
      currentYear,
    };
  },
}).mount("#app");
