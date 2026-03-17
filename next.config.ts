import type { NextConfig } from "next";
import { withAeo } from "aeo.js/next";

const nextConfig: NextConfig = {
  turbopack: {},
};

export default withAeo(nextConfig, {
  aeo: {
    title: "Portfólio - Leandro Dukiévicz",
    description: "Portifólio de projetos pessoais e profissionais - Leandro Dukiévicz - Desenvolvedor Front-end",
    url: "https://leandrodukievicz.com",
  },
});
