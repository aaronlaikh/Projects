package ir.assignments.two;

import edu.uci.ics.crawler4j.crawler.CrawlConfig;
import edu.uci.ics.crawler4j.crawler.Page;
import edu.uci.ics.crawler4j.crawler.WebCrawler;
import edu.uci.ics.crawler4j.fetcher.PageFetcher;
import edu.uci.ics.crawler4j.parser.HtmlParseData;
import edu.uci.ics.crawler4j.robotstxt.RobotstxtConfig;
import edu.uci.ics.crawler4j.robotstxt.RobotstxtServer;
import edu.uci.ics.crawler4j.url.WebURL;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.*;
import java.util.regex.Pattern;

public class Crawler extends WebCrawler {

	///////////////////////////////////////////
	// MEMBERS
	///////////////////////////////////////////
	private final static Pattern FILTERS = Pattern.compile(".*(\\.(css|js|gif|jpg" + "|png|mp3|mp3|zip|gz))$");
	private final static String icsDomain = "http://www.ics.uci.edu";
	private static final String subdomainFileDir = "../Assignment2";
	private static final String subdomainFileName = "Subdomains.txt";
	private static File subdomainFile;
	private static ArrayList<String> urlCollection;

	/**
	 * This methods performs a crawl starting at the specified seed URL. Returns a
	 * collection containing all URLs visited during the crawl.
	 *
	 * @param seedURL - Seed URL to crawl
	 */
	public static Collection<String> crawl(String seedURL) {
		Controller controller = new Controller(seedURL);
		urlCollection = new ArrayList<String>();
		createSubdomainFile();

		controller.start();

		return urlCollection;

	}

	/**
	 * Specifies whether the given url should be crawled or not (based on your crawling logic).
	 * It sets up a RobotstxtConfig and RobotstxtServer to check whether the given URL is
	 * allowed to be visited.
	 * The crawler will ignore urls that have css, js, git, ... extensions and will only
	 * accept urls that start with "http://www.ics.uci.edu/".
	 *
	 * @param referringPage - Page referring to the given URL
	 * @param url - URL to be checked whether to visit or not
	 */
	@Override
	public boolean shouldVisit(Page referringPage, WebURL url) {
		CrawlConfig config = new CrawlConfig();
		PageFetcher pageFetcher = new PageFetcher(config);
		RobotstxtConfig robotstxtConfig = new RobotstxtConfig();
		RobotstxtServer robotstxtServer = new RobotstxtServer(robotstxtConfig, pageFetcher);

		// If the robots.txt configuration is enabled and DOES NOT allow the given url
		// DO NOT visit it
		if(robotstxtConfig.isEnabled() && !robotstxtServer.allows(url)){
			return false;
		}

		String href = url.getURL().toLowerCase();
		return !FILTERS.matcher(href).matches() && href.startsWith(icsDomain);
	}

	/**
	 * This function is called when a page is fetched and ready
	 * to be processed. It gathers the data, text, html, and outgoing
	 * links of the page, then adds the URL as a key to the subdomainMap
	 * with the number of outgoing links as a value;
	 *
	 * @param page - Page being visited on a specific URL
	 */
	@Override
	public void visit(Page page) {
		String url = page.getWebURL().getURL();
		System.out.println("URL: " + url);
		urlCollection.add(url);

		if (page.getParseData() instanceof HtmlParseData) {
			HtmlParseData htmlParseData = (HtmlParseData) page.getParseData();
			String text = htmlParseData.getText();
			String html = htmlParseData.getHtml();
			Set<WebURL> links = htmlParseData.getOutgoingUrls();

			System.out.println("Text length: " + text.length());
			System.out.println("Html length: " + html.length());
			System.out.println("Number of outgoing links: " + links.size());

			if(!url.equals(icsDomain + "/")) {
				addSubdomain(url, links.size());

			}

		}

	}

	/**
	 * Main function for running the crawler on the ICS domain.
	 * This is primarily used for testing.
	 *
	 * @param args
     */
	///////////////////////////////////////////
	// MAIN FUNCTION
	///////////////////////////////////////////
	public static void main(String[] args){
		crawl(icsDomain);

	}


	///////////////////////////////////////////
	// METHODS
	///////////////////////////////////////////
	private static void createSubdomainFile(){
		subdomainFile = new File(subdomainFileDir, subdomainFileName);
		BufferedWriter writer = null;

		try {
			writer = new BufferedWriter(new FileWriter(subdomainFile));
			writer.write("");

		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			try {
				writer.close();

			} catch (Exception e) {
				e.printStackTrace();

			}

		}

	}
	private static void addSubdomain(String url, int nLinks){
		BufferedWriter writer = null;

		try {
			writer = new BufferedWriter(new FileWriter(subdomainFile, true));
			writer.write(url + ", " + nLinks);
			writer.newLine();

		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			try {
				writer.close();

			} catch (Exception e) {
				e.printStackTrace();

			}

		}

	}

}
