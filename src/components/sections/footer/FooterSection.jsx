import LaunchUI from "@/components/logos/launch-ui";
import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "@/components/ui/footer";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function FooterSection() {
  return (
    <footer className="w-full bg-background px-4">
      <div className="mx-auto max-w-container">
        <Footer className="border-t pt-8">
          <FooterContent className="sm:grid-cols-2 md:grid-cols-3">
            <FooterColumn className="col-span-2 flex-row items-center justify-between gap-8 border-b pb-8 md:col-span-1 md:flex-col md:items-start md:justify-start md:border-b-0">
              <div className="flex items-center gap-2">
                <LaunchUI />
                <h3 className="text-xl font-bold">Launch UI</h3>
              </div>
              <div className="ml-2.5 flex gap-4 sm:ml-0">
                <Link
                  href="/"
                  className="text-muted-foreground"
                >
                  <span className="sr-only">GitHub</span>

                </Link>
                <Link
                  href="/"
                  className="text-muted-foreground"
                >
                  <span className="sr-only">Twitter</span>
                  
                </Link>
                <Link href="/" className="text-muted-foreground">
                  <span className="sr-only">Discord</span>

                </Link>
              </div>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Product</h3>
              <a href="#" className="text-sm text-muted-foreground">
                Changelog
              </a>
              <a href="#" className="text-sm text-muted-foreground">
                Documentation
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Company</h3>
              <a href="#" className="text-sm text-muted-foreground">
                About
              </a>
              <a href="#" className="text-sm text-muted-foreground">
                Careers
              </a>
              <a href="#" className="text-sm text-muted-foreground">
                Blog
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Contact</h3>
              <a href="#" className="text-sm text-muted-foreground">
                Discord
              </a>
              <a href="#" className="text-sm text-muted-foreground">
                Twitter
              </a>
              <a
                href="/"
                className="text-sm text-muted-foreground"
              >
                Github
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Legal</h3>
              <a href="#" className="text-sm text-muted-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground">
                Cookie Policy
              </a>
            </FooterColumn>
          </FooterContent>
          <FooterBottom className="border-0">
            <div>© 2024 aanafiu. All rights reserved</div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
