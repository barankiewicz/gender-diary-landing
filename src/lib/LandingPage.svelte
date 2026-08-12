<script lang="ts">
  import PageShell from '$lib/PageShell.svelte';
  import Prose from '$lib/Prose.svelte';
  import { JOURNAL_URL, messages, pathFor, type Locale } from '$lib/site';

  let { locale }: { locale: Locale } = $props();

  const m = $derived(messages[locale]);
</script>

<PageShell {locale} page="landing" title={m.pageTitle}>
  <h1>{m.pageTitle}</h1>
  <p>{m.hero.headline}</p>
  <p>{m.hero.subheadline}</p>

  <section>
    <h2>{m.sectionOverview}</h2>
    <Prose paragraphs={m.overview} />
  </section>

  <section>
    <h2>{m.sectionPrivacy}</h2>
    <Prose paragraphs={m.privacyHandoff} />
    <!-- The link is the privacy page's own title, so the reader knows what
         they are opening before they open it. -->
    <p><a href={pathFor(locale, 'privacy')}>{m.privacyPage.title}</a></p>
  </section>

  <section>
    <h2>{m.sectionTour}</h2>
    <p>{m.tourIntro}</p>

    <!-- Captions without their screenshots. Ticket 09 makes the images from
         synthetic data and puts them in these blocks; until it does, each
         screen is its name and what it holds, and the page shows no picture
         and describes none. -->
    <ol class="tour">
      {#each m.tour as screen (screen.screen)}
        <li>
          <h3>{screen.screen}</h3>
          <p>{screen.caption}</p>
        </li>
      {/each}
    </ol>
  </section>

  <section>
    <h2>{m.sectionFeatures}</h2>
    {#each m.features as group (group.group)}
      <!-- The groups are headed rather than run together because one of them
           opens by saying that everything in it is off until you turn it on,
           and that sentence is only true of its own group. -->
      <h3>{group.group}</h3>
      <Prose paragraphs={group.paragraphs} />
    {/each}
  </section>

  <section>
    <h2>{m.sectionAcquisition}</h2>
    <p>{m.acquisitionIntro}</p>

    <!-- The one action on the page: a plain link, in this tab, to the URL
         and nothing appended to it. What may not ride along with it is on
         JOURNAL_URL in $lib/site. -->
    <p><a class="action" href={JOURNAL_URL}>{m.startJournal}</a></p>

    <p>{m.acquisitionAndroid}</p>

    <!-- The three that do not report an install to Google first, alphabetical
         among themselves, and Google Play last. A channel becomes a link when
         it has an artifact behind it (Journal ticket 18) and is its own status
         until then. -->
    <ul>
      {#each m.channels as channel (channel.name)}
        <li>
          <strong>{channel.name}</strong>
          <span class="status">{m.channelStatus}</span>
          <p>{channel.note}</p>
        </li>
      {/each}
    </ul>
  </section>

  <section>
    <h2>{m.sectionSupport}</h2>
    <Prose paragraphs={m.support} />
  </section>
</PageShell>
